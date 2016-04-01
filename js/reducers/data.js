import {
    ADD_PLAYER,
    ASSIGN_GROUPS,
    CHANGE_GROUP_COUNT,
    CHANGE_PLAYER_NAME,
    SET_PRELIMINARIES,
} from '../actions';

const initialState = {
    players: [],
    groups: [{ players: [] }],
    preliminaries: [],
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

        case SET_PRELIMINARIES:
            return Object.assign({}, state, {
                preliminaries: action.payload.preliminaries,
            });

        default:
            return state;
    }
};