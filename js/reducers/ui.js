import {
    CHANGE_VIEW,
    SET_UI,
    START_TOURNEY,
} from '../actions';

const initialState = {
    started: false,
    view: 'options',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_VIEW:
            return Object.assign({}, state, {
                view: action.payload.view,
            });

        case SET_UI:
            return action.payload.ui;

        case START_TOURNEY:
            return Object.assign({}, state, {
                started: true,
            });

        default:
            return state;
    }
};
