import {
    CHANGE_VIEW,
} from '../actions';

const initialState = {
    view: 'options',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_VIEW:
            return Object.assign({}, state, {
                view: action.payload.view,
            });

        default:
            return state;
    }
};
