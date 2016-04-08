import {
    ADD_PLAYER,
    CHANGE_CUTOFF,
    CHANGE_GROUP_COUNT,
    CHANGE_GROUPS,
    CHANGE_PLAYER_NAME,
    CHANGE_SCORE,
    CHANGE_WINS_PER_MATCH,
    SET_PRELIMINARIES,
} from '../actions';

const initialState = {
    cutoff: 1,
    players: [],
    groups: [{ players: [] }],
    preliminaries: [],
    winsPerMatch: [2],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_PLAYER:
            return Object.assign({}, state, {
                players: [
                    ...state.players,
                    {
                        diff: 0,
                        name: '',
                        wins: 0,
                    },
                ],
            });

        case CHANGE_CUTOFF:
            return Object.assign({}, state, {
                cutoff: parseInt(action.payload.cutoff, 10),
            });

        case CHANGE_GROUP_COUNT:
            return Object.assign({}, state, {
                groups: Array.from(
                    new Array(parseInt(action.payload.groupCount, 10)),
                    () => ({ players: [] })
                ),
            });

        case CHANGE_GROUPS:
            return Object.assign({}, state, {
                groups: action.payload.groups,
            });

        case CHANGE_PLAYER_NAME:
            return Object.assign({}, state, {
                players: [
                    ...state.players.slice(0, action.payload.index),
                    Object.assign({}, state.players[action.payload.index], {
                        name: action.payload.name,
                    }),
                    ...state.players.slice(action.payload.index + 1),
                ],
            });

        case CHANGE_SCORE:
            return Object.assign({}, state, {
                [action.payload.type]: [
                    ...state[action.payload.type].slice(0, action.payload.matchIndex),
                    Object.assign({}, state[action.payload.type][action.payload.matchIndex], {
                        scores: [
                            ...state[action.payload.type][action.payload.matchIndex].scores.slice(0, action.payload.playerIndex),
                            [
                                ...state[action.payload.type][action.payload.matchIndex].scores[action.payload.playerIndex].slice(0, action.payload.gameIndex),
                                action.payload.score,
                                ...state[action.payload.type][action.payload.matchIndex].scores[action.payload.playerIndex].slice(action.payload.gameIndex + 1),
                            ],
                            ...state[action.payload.type][action.payload.matchIndex].scores.slice(action.payload.playerIndex + 1),
                        ],
                    }),
                    ...state[action.payload.type].slice(action.payload.matchIndex + 1),
                ],
            });

        case CHANGE_WINS_PER_MATCH:
            return Object.assign({}, state, {
                winsPerMatch: [
                    ...state.winsPerMatch.slice(0, action.payload.index),
                    action.payload.wins,
                    ...state.winsPerMatch.slice(action.payload.index + 1),
                ],
            });

        case SET_PRELIMINARIES:
            return Object.assign({}, state, {
                preliminaries: action.payload.preliminaries,
            });

        default:
            return state;
    }
};