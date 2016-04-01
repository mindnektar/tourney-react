import {
    START,
} from '../actions';

const initialState = {
    prepping: true,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case START:
            return Object.assign({}, state, {
                prepping: false,
            });

        default:
            return state;
    }
};
