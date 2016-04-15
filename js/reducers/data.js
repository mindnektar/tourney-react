import {
    ADD_PLAYER,
    CALCULATE_ROUND_COUNT,
    CHANGE_CUTOFF,
    CHANGE_GROUP_COUNT,
    CHANGE_GROUPS,
    CHANGE_PLAYER_NAME,
    CHANGE_SCORE,
    CHANGE_WINS_PER_MATCH,
    DELETE_PLAYER,
    SET_MATCHES,
} from '../actions';

const initialState = {
    cutoff: 1,
    players: [],
    groups: [{ players: [] }],
    matches: [],
    winsPerMatch: [2],
};

export default (state = initialState, action = {}) => {
    let roundCount;

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

        case CALCULATE_ROUND_COUNT:
            roundCount = Math.ceil(Math.log2(state.cutoff * state.groups.length)) + 1;

            return Object.assign({}, state, {
                winsPerMatch: [
                    ...state.winsPerMatch.slice(0, roundCount),
                    ...Array.from(
                        new Array(Math.max(0, roundCount - state.winsPerMatch.length)),
                        () => 2
                    ),
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
                matches: [
                    ...state.matches.slice(0, action.payload.roundIndex),
                    [
                        ...state.matches[action.payload.roundIndex].slice(0, action.payload.matchIndex),
                        Object.assign({}, state.matches[action.payload.roundIndex][action.payload.matchIndex], {
                            scores: [
                                ...state.matches[action.payload.roundIndex][action.payload.matchIndex].scores.slice(0, action.payload.playerIndex),
                                [
                                    ...state.matches[action.payload.roundIndex][action.payload.matchIndex].scores[action.payload.playerIndex].slice(0, action.payload.gameIndex),
                                    action.payload.score,
                                    ...state.matches[action.payload.roundIndex][action.payload.matchIndex].scores[action.payload.playerIndex].slice(action.payload.gameIndex + 1),
                                ],
                                ...state.matches[action.payload.roundIndex][action.payload.matchIndex].scores.slice(action.payload.playerIndex + 1),
                            ],
                        }),
                        ...state.matches[action.payload.roundIndex].slice(action.payload.matchIndex + 1),
                    ],
                    ...state.matches.slice(action.payload.roundIndex + 1),
                ],
            });

        case CHANGE_WINS_PER_MATCH:
            return Object.assign({}, state, {
                winsPerMatch: [
                    ...state.winsPerMatch.slice(0, action.payload.index),
                    parseInt(action.payload.wins, 10),
                    ...state.winsPerMatch.slice(action.payload.index + 1),
                ],
            });

        case DELETE_PLAYER:
            return Object.assign({}, state, {
                players: [
                    ...state.players.slice(0, action.payload.index),
                    ...state.players.slice(action.payload.index + 1),
                ],
            });

        case SET_MATCHES:
            return Object.assign({}, state, {
                matches: action.payload.matches,
            });

        default:
            return state;
    }
};