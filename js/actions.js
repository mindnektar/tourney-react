export const ADD_PLAYER = 'ADD_PLAYER';
export const ASSIGN_GROUPS = 'ASSIGN_GROUPS';
export const CHANGE_CUTOFF = 'CHANGE_CUTOFF';
export const CHANGE_GROUP_COUNT = 'CHANGE_GROUP_COUNT';
export const CHANGE_PLAYER_NAME = 'CHANGE_PLAYER_NAME';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_WINS_PER_MATCH = 'CHANGE_WINS_PER_MATCH';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const SET_PRELIMINARIES = 'SET_PRELIMINARIES';
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

const determinePreliminaries = (groups, winsPerMatch) => {
    const preliminaries = [];
    const playersPerGroup = groups[0].players.length;
    const virtualPlayersPerGroup = Math.ceil(playersPerGroup / 2) * 2;
    const matcher = Array.apply(null, { length: virtualPlayersPerGroup }).map(Number.call, Number);

    for (let i = 0; i < virtualPlayersPerGroup - 1; i++) {
        for (let j = 0; j < virtualPlayersPerGroup / 2; j++) {
            for (let k = 0; k < groups.length; k++) {
                if (matcher[j] !== playersPerGroup && matcher[virtualPlayersPerGroup - 1 - j] !== playersPerGroup) {
                    preliminaries.push({
                        group: k,
                        players: [
                            matcher[j],
                            matcher[virtualPlayersPerGroup - 1 - j],
                        ],
                        scores: Array.from(
                            new Array(2),
                            () => Array.from(
                                new Array(winsPerMatch * 2 - 1),
                                () => null
                            )
                        ),
                    });
                }
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

    return preliminaries;
};

export const addPlayer = () => ({ type: ADD_PLAYER });
export const changeCutoff = cutoff => ({ type: CHANGE_CUTOFF, payload: { cutoff } });
export const changePlayerName = (index, name) => ({ type: CHANGE_PLAYER_NAME, payload: { index, name } });
export const changeWinsPerMatch = (type, wins) => ({ type: CHANGE_WINS_PER_MATCH, payload: { type, wins } });

export const changeGroupCount = groupCount => (dispatch, getState) => {
    const cutoff = Math.min(
        Math.max(1, Math.ceil(groupCount / getState().data.players.length) - 1),
        getState().data.cutoff
    );

    dispatch(changeCutoff(cutoff));
    dispatch({ type: CHANGE_GROUP_COUNT, payload: { groupCount } });
};

export const changeScore = (type, matchIndex, playerIndex, gameIndex, score) => (dispatch, getState) => {
    if (score === '') {
        score = null;
    } else {
        score = parseInt(score, 10);

        if (isNaN(score)) {
            score = getState().data[type][matchIndex].scores[playerIndex][gameIndex] || 0;
        }
    }

    dispatch({ type: START_TOURNEY });
    dispatch({ type: CHANGE_SCORE, payload: { type, matchIndex, playerIndex, gameIndex, score } });
};

export const changeView = view => (dispatch, getState) => {
    const currentView = getState().ui.view;

    if (currentView === view) {
        return;
    }

    if (currentView === 'options') {
        const { groups, players, winsPerMatch } = getState().data;
        const assignedGroups = assignPlayersRandomlyToGroups(groups.slice(0), players.slice(0));

        dispatch({ type: ASSIGN_GROUPS, payload: { groups: assignedGroups } });

        dispatch({
            type: SET_PRELIMINARIES,
            payload: {
                preliminaries: determinePreliminaries(assignedGroups, winsPerMatch.preliminaries),
            },
        });
    }

    dispatch({ type: CHANGE_VIEW, payload: { view } });
};
