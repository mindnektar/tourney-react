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
export const SET_DATA = 'SET_DATA';
export const SET_MATCHES = 'SET_MATCHES';
export const SET_UI = 'SET_UI';
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
            if (score !== '' && match.scores[1][scoreIndex] !== '') {
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

const compareScores = (scores, winsPerMatch) => {
    const gameWins = [0, 0];

    scores[0].forEach((score, index) => {
        if (score > scores[1][index]) {
            gameWins[0]++;
        } else if (score < scores[1][index]) {
            gameWins[1]++;
        }
    });

    if (gameWins[0] >= winsPerMatch || gameWins[1] >= winsPerMatch) {
        return gameWins[0] > gameWins[1] ? 0 : 1;
    }

    return null;
};

const createMatch = (player1, player2, winsPerMatch) => ({
    players: [player1, player2],
    scores: Array.from(
        new Array(2),
        () => Array.from(
            new Array(winsPerMatch * 2 - 1),
            () => ''
        )
    ),
});

const determineFirstKnockoutRound = (groups, cutoff, winsPerMatch) => {
    const matchesPerGroup = Math.floor(cutoff / 2);
    const matches = [];

    groups.forEach(group => {
        for (let j = 0; j < matchesPerGroup; j++) {
            matches.push(
                createMatch(
                    group.players.find(player => player.ranking === j),
                    group.players.find(player => player.ranking === cutoff - 1 - j),
                    winsPerMatch
                )
            );
        }
    });

    if (cutoff % 2 !== 0) {
        const remainingGroups = groups.slice(0);
        let bye = null;

        if (groups.length % 2 !== 0) {
            bye = Math.floor(Math.random() * groups.length);
            remainingGroups.splice(bye, 1);
        }

        for (let l = 0; l < remainingGroups.length / 2; l += 2) {
            matches.push(
                createMatch(
                    remainingGroups[l].players.find(player => player.ranking === matchesPerGroup),
                    remainingGroups[l + 1].players.find(player => player.ranking === matchesPerGroup),
                    winsPerMatch
                )
            );
        }

        if (bye !== null) {
            matches.push({ bye: groups[bye].players.find(player => player.ranking === matchesPerGroup) });
        }
    }

    return matches;
};

const determineKnockout = (groups, cutoff, winsPerMatch) => {
    const roundCount = Math.ceil(Math.log2(cutoff * groups.length));
    const matches = [];

    for (let i = 0; i < roundCount; i++) {
        matches.push([]);

        if (i === 0) {
            matches[i] = determineFirstKnockoutRound(groups, cutoff, winsPerMatch[i]);
        } else {
            matches[i] = determineSubsequentKnockoutRound(matches[i - 1], cutoff, winsPerMatch[i]);
        }
    }

    return matches;
};

const determineSubsequentKnockoutRound = (previousMatches, cutoff, winsPerMatch) => {
    const matches = [];

    for (let k = 0; k < previousMatches.length; k += 2) {
        let winnerA = null;
        let winnerB = null;

        if (previousMatches[k].bye) {
            matches.push({ bye: previousMatches[k].bye });

            return matches;
        }

        if (!previousMatches[k + 1]) {
            winnerA = compareScores(previousMatches[k].scores, winsPerMatch);

            matches.push({ bye: winnerA !== null ? previousMatches[k].players[winnerA] : '' });

            return matches;
        }

        if (typeof previousMatches[k + 1].bye !== 'undefined') {
            if (matches.length === 0) {
                winnerA = compareScores(previousMatches[k].scores, winsPerMatch);

                matches.push(
                    createMatch(
                        winnerA !== null ? previousMatches[k].players[winnerA] : '',
                        previousMatches[k + 1].bye,
                        winsPerMatch
                    )
                );
            } else {
                matches.push({ bye: previousMatches[k + 1].bye });
            }

            return matches;
        }

        winnerA = compareScores(previousMatches[k].scores, winsPerMatch);
        winnerB = compareScores(previousMatches[k + 1].scores, winsPerMatch);

        matches.push(
            createMatch(
                winnerA !== null ? previousMatches[k].players[winnerA] : '',
                winnerB !== null ? previousMatches[k + 1].players[winnerB] : '',
                winsPerMatch
            )
        );
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

const hasScores = matches => {
    let hasScore = false;

    matches.forEach(match => {
        if (match.scores) {
            match.scores.forEach(player => {
                player.forEach(score => {
                    if (score) {
                        hasScore = true;
                    }
                });
            });
        }
    });

    return hasScore;
};

export const addPlayer = () => ({ type: ADD_PLAYER });
export const calculateRoundCount = () => ({ type: CALCULATE_ROUND_COUNT });
export const changeGroups = groups => ({ type: CHANGE_GROUPS, payload: { groups } });
export const changePlayerName = (index, name) => ({ type: CHANGE_PLAYER_NAME, payload: { index, name } });
export const changeWinsPerMatch = (index, wins) => ({ type: CHANGE_WINS_PER_MATCH, payload: { index, wins } });
export const deletePlayer = index => ({ type: DELETE_PLAYER, payload: { index } });
export const setData = data => ({ type: SET_DATA, payload: { data } });
export const setMatches = (roundIndex, matches) => ({ type: SET_MATCHES, payload: { roundIndex, matches } });
export const setUi = ui => ({ type: SET_UI, payload: { ui } });

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
    const { matches } = getState().data;

    if (
        (roundIndex > 0 && !hasScores(matches[roundIndex - 1])) ||
        (roundIndex < matches.length - 1 && hasScores(matches[roundIndex + 1]))
    ) {
        score = null;
    }

    if (score !== null && score !== '') {
        score = parseInt(score, 10);

        if (isNaN(score)) {
            score = matches[roundIndex][matchIndex].scores[playerIndex][gameIndex] || 0;
        }
    }

    dispatch({ type: CHANGE_SCORE, payload: { roundIndex, matchIndex, playerIndex, gameIndex, score } });
};

export const changeView = view => (dispatch, getState) => {
    const currentView = getState().ui.view;

    if (currentView === view) {
        return;
    }

    dispatch({ type: CHANGE_VIEW, payload: { view } });
};

export const createTourney = () => (dispatch, getState) => {
    const { groups, players, cutoff, winsPerMatch } = getState().data;
    const assignedGroups = assignPlayersRandomlyToGroups(groups.slice(0), players.slice(0));
    const preliminaries = determinePreliminaries(assignedGroups, winsPerMatch[0]);

    dispatch(changeGroups(calculateGroupPositions(assignedGroups.slice(0), preliminaries)));
    dispatch(
        setMatches(
            null,
            [
                preliminaries,
                ...determineKnockout(getState().data.groups, cutoff, winsPerMatch.slice(1)),
            ]
        )
    );
};

export const updateMatches = (roundIndex) => (dispatch, getState) => {
    const { matches, groups, cutoff, winsPerMatch } = getState().data;

    if (
        (roundIndex > 0 && !hasScores(matches[roundIndex - 1])) ||
        (roundIndex < matches.length - 1 && hasScores(matches[roundIndex + 1]))
    ) {
        return;
    }

    if (roundIndex === 0) {
        dispatch(changeGroups(calculateGroupPositions(groups.slice(0), getState().data.matches[0])));
        dispatch(setMatches(1, determineFirstKnockoutRound(getState().data.groups, cutoff, winsPerMatch[1])));
        dispatch({ type: START_TOURNEY });
    } else if (roundIndex < winsPerMatch.length - 1) {
        dispatch(setMatches(roundIndex + 1, determineSubsequentKnockoutRound(getState().data.matches[roundIndex], cutoff, winsPerMatch[roundIndex + 1])));
    }
};
