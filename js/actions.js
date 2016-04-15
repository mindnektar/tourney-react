export const ADD_PLAYER = 'ADD_PLAYER';
export const CALCULATE_ROUND_COUNT = 'CALCULATE_ROUND_COUNT';
export const CHANGE_CUTOFF = 'CHANGE_CUTOFF';
export const CHANGE_GROUP_COUNT = 'CHANGE_GROUP_COUNT';
export const CHANGE_GROUPS = 'CHANGE_GROUPS';
export const CHANGE_PLAYER_NAME = 'CHANGE_PLAYER_NAME';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_WINS_PER_MATCH = 'CHANGE_WINS_PER_MATCH';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const SET_MATCHES = 'SET_MATCHES';
export const START_TOURNEY = 'START_TOURNEY';

const assignPlayersRandomlyToGroups = (groups, players) => {
    if (!players.length) {
        return groups;
    }

    let groupIndex = 0;

    groups = groups.map(() => ({ players: [] }));

    while (true) {
        const playerIndex = Math.floor(Math.random() * players.length);

        groups[groupIndex].players.push(players[playerIndex]);

        players.splice(playerIndex, 1);

        if (!players.length) {
            break;
        }

        groupIndex = groupIndex === groups.length - 1 ? 0 : groupIndex + 1;
    }

    while (groupIndex < groups.length - 1) {
        groups[++groupIndex].players.push({
            diff: '-',
            name: '---',
            wins: '-',
        });
    }

    return groups;
};

const calculateGroupPositions = (groups, matches) => {
    groups.forEach(group => {
        group.players.forEach(player => {
            player.wins = 0;
            player.diff = 0;
        });
    });

    matches.forEach(match => {
        const gameWins = [0, 0];

        match.scores[0].forEach((score, scoreIndex) => {
            if (score !== null && match.scores[1][scoreIndex] !== null) {
                const scoreDiff = score - match.scores[1][scoreIndex];

                if (scoreDiff > 0) {
                    gameWins[0]++;
                    groups[match.group].players[match.players[0]].diff += Math.abs(scoreDiff);
                    groups[match.group].players[match.players[1]].diff -= Math.abs(scoreDiff);
                } else {
                    gameWins[1]++;
                    groups[match.group].players[match.players[1]].diff += Math.abs(scoreDiff);
                    groups[match.group].players[match.players[0]].diff -= Math.abs(scoreDiff);
                }
            }
        });

        const minGameWinsToWinRound = Math.ceil(match.scores[0].length / 2);

        if (gameWins[0] >= minGameWinsToWinRound || gameWins[1] >= minGameWinsToWinRound) {
            if (gameWins[0] > gameWins[1]) {
                groups[match.group].players[match.players[0]].wins++;
            } else {
                groups[match.group].players[match.players[1]].wins++;
            }
        }
    });

    groups.forEach((group, groupIndex) => {
        group.players.slice(0)
            .sort((a, b) => {
                if (a.name === '---') return 1;
                if (b.name === '---') return -1;
                if (a.wins > b.wins) return -1;
                if (b.wins > a.wins) return 1;
                if (a.diff > b.diff) return -1;
                if (b.diff > a.diff) return 1;

                return 0;
            })
            .forEach((oldPlayer, playerIndex) => {
                groups[groupIndex].players.find(player => player.name === oldPlayer.name).ranking = playerIndex;
            });
    });

    return groups;
};

const createMatch = (player1, player2, winsPerMatch) => ({
    players: [player1, player2],
    scores: Array.from(
        new Array(2),
        () => Array.from(
            new Array(winsPerMatch * 2 - 1),
            () => null
        )
    ),
});

const determineKnockout = (groups, cutoff, winsPerMatch) => {
    const roundCount = Math.ceil(Math.log2(cutoff * groups.length)) + 1;
    const matchesPerGroup = Math.floor(cutoff / 2);
    const matches = [];

    for (let i = 0; i < roundCount - 1; i++) {
        matches.push([]);

        if (i === 0) {
            groups.forEach(group => {
                for (let j = 0; j < matchesPerGroup; j++) {
                    matches[i].push(
                        createMatch(
                            group.players.find(player => player.ranking === j),
                            group.players.find(player => player.ranking === cutoff - 1 - j),
                            winsPerMatch[i]
                        )
                    );
                }
            });

            if (cutoff % 2 !== 0) {
                const remainingGroups = groups.slice(0);
                let bye;

                if (groups.length % 2 !== 0) {
                    bye = Math.floor(Math.random() * groups.length);
                    remainingGroups.splice(bye, 1);
                }

                for (let l = 0; l < remainingGroups.length / 2; l += 2) {
                    matches[i].push(
                        createMatch(
                            remainingGroups[l].players.find(player => player.ranking === matchesPerGroup),
                            remainingGroups[l + 1].players.find(player => player.ranking === matchesPerGroup),
                            winsPerMatch[i]
                        )
                    );
                }

                if (bye) {
                    matches[i].push({ bye: groups[bye].players.find(player => player.ranking === matchesPerGroup) });
                }
            }
        } else {
            for (let k = 0; k < matches[i - 1].length; k += 2) {
                let winDiffA = 0;
                let winDiffB = 0;

                if (!matches[i - 1][k + 1] || matches[i - 1][k + 1].bye) {
                    break;
                }

                matches[i - 1][k].scores[0].forEach((score, index) => {
                    if (score > matches[i - 1][k].scores[1][index]) {
                        winDiffA++;
                    } else if (score < matches[i - 1][k].scores[1][index]) {
                        winDiffA--;
                    }
                });

                matches[i - 1][k + 1].scores[0].forEach((score, index) => {
                    if (score > matches[i - 1][k + 1].scores[1][index]) {
                        winDiffB++;
                    } else if (score < matches[i - 1][k + 1].scores[1][index]) {
                        winDiffB--;
                    }
                });

                matches[i].push(
                    createMatch(
                        winDiffA ? matches[i - 1][k].players[winDiffA > 0 ? 0 : 1] : '',
                        winDiffB ? matches[i - 1][k + 1].players[winDiffB > 0 ? 0 : 1] : '',
                        winsPerMatch[i]
                    )
                );
            }
        }
    }

    return matches;
};

const determinePreliminaries = (groups, winsPerMatch) => {
    const playersPerGroup = groups[0].players.length;
    const virtualPlayersPerGroup = Math.ceil(playersPerGroup / 2) * 2;
    const matcher = Array.apply(null, { length: virtualPlayersPerGroup }).map(Number.call, Number);
    const matches = [];

    for (let i = 0; i < virtualPlayersPerGroup - 1; i++) {
        for (let j = 0; j < virtualPlayersPerGroup / 2; j++) {
            for (let k = 0; k < groups.length; k++) {
                const player1 = matcher[j];
                const player2 = matcher[virtualPlayersPerGroup - 1 - j];

                if (player1 === playersPerGroup || player2 === playersPerGroup) {
                    break;
                }

                if (groups[k].players[player1].name === '---' || groups[k].players[player2].name === '---') {
                    break;
                }

                matches.push(Object.assign({ group: k }, createMatch(
                    matcher[j],
                    matcher[virtualPlayersPerGroup - 1 - j],
                    winsPerMatch
                )));
            }
        }

        matcher.forEach((_, index) => {
            if (matcher[index] !== 0) {
                matcher[index]++;

                if (matcher[index] === virtualPlayersPerGroup) {
                    matcher[index] = 1;
                }
            }
        });
    }

    return matches;
};

export const addPlayer = () => ({ type: ADD_PLAYER });
export const calculateRoundCount = () => ({ type: CALCULATE_ROUND_COUNT });
export const changeGroups = groups => ({ type: CHANGE_GROUPS, payload: { groups } });
export const changePlayerName = (index, name) => ({ type: CHANGE_PLAYER_NAME, payload: { index, name } });
export const changeWinsPerMatch = (index, wins) => ({ type: CHANGE_WINS_PER_MATCH, payload: { index, wins } });
export const deletePlayer = index => ({ type: DELETE_PLAYER, payload: { index } });

export const changeCutoff = cutoff => dispatch => {
    dispatch({ type: CHANGE_CUTOFF, payload: { cutoff } });
    dispatch(calculateRoundCount());
};

export const changeGroupCount = groupCount => (dispatch, getState) => {
    const cutoff = Math.min(
        Math.max(1, Math.ceil(getState().data.players.length / groupCount) - 1),
        getState().data.cutoff
    );

    dispatch(changeCutoff(cutoff));
    dispatch({ type: CHANGE_GROUP_COUNT, payload: { groupCount } });
    dispatch(calculateRoundCount());
};

export const changeScore = (roundIndex, matchIndex, playerIndex, gameIndex, score) => (dispatch, getState) => {
    const { groups } = getState().data;

    if (score === '') {
        score = null;
    } else {
        score = parseInt(score, 10);

        if (isNaN(score)) {
            score = getState().data.matches[roundIndex][matchIndex].scores[playerIndex][gameIndex] || 0;
        }
    }

    dispatch({ type: START_TOURNEY });
    dispatch({ type: CHANGE_SCORE, payload: { roundIndex, matchIndex, playerIndex, gameIndex, score } });

    if (roundIndex === 0) {
        dispatch(setMatches(getState().data.matches[0]));
        dispatch(changeGroups(calculateGroupPositions(groups.slice(0), getState().data.matches[0])));
    }
};

export const changeView = view => (dispatch, getState) => {
    const currentView = getState().ui.view;

    if (currentView === view) {
        return;
    }

    if (currentView === 'options') {
        const { groups, players } = getState().data;
        const assignedGroups = assignPlayersRandomlyToGroups(groups.slice(0), players.slice(0));

        dispatch(changeGroups(assignedGroups));
        dispatch(setMatches());

        if (view === 'preliminaries') {
            dispatch(changeGroups(calculateGroupPositions(assignedGroups.slice(0), getState().data.matches[0])));
        }
    }

    dispatch({ type: CHANGE_VIEW, payload: { view } });
};

export const setMatches = preliminaries => (dispatch, getState) => {
    const { groups, winsPerMatch, cutoff } = getState().data;

    dispatch({
        type: SET_MATCHES,
        payload: {
            matches: [
                preliminaries || determinePreliminaries(groups, winsPerMatch[0]),
                ...determineKnockout(groups, cutoff, winsPerMatch.slice(1)),
            ],
        },
    });
};
