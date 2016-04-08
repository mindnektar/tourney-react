import {
    CHANGE_VIEW,
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

        case START_TOURNEY:
            return Object.assign({}, state, {
                started: true,
            });

        default:
            return state;
    }
};
