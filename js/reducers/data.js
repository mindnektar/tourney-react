import {
    ADD_PLAYER,
    ASSIGN_GROUPS,
    CHANGE_CUTOFF,
    CHANGE_GROUP_COUNT,
    CHANGE_PLAYER_NAME,
    CHANGE_WINS_PER_MATCH,
    SET_PRELIMINARIES,
} from '../actions';

const initialState = {
    cutoff: 1,
    players: [],
    groups: [{ players: [] }],
    preliminaries: [],
    winsPerMatch: {
        finals: 4,
        preliminaries: 2,
        quarterFinals: 2,
        semiFinals: 3,
    },
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

        case ASSIGN_GROUPS:
            return Object.assign({}, state, {
                groups: action.payload.groups,
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

        case CHANGE_WINS_PER_MATCH:
            return Object.assign({}, state, {
                winsPerMatch: Object.assign({}, state.winsPerMatch, {
                    [action.payload.type]: action.payload.wins,
                }),
            });

        case SET_PRELIMINARIES:
            return Object.assign({}, state, {
                preliminaries: action.payload.preliminaries,
            });

        default:
            return state;
    }
};