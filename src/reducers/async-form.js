import {
    ASYNC_FORM_STATUS_UPDATE,
} from '../constants';

const initialState = {};

function asyncForm(state = initialState, action) {
    const { type, status, success} = action;

    if (type === ASYNC_FORM_STATUS_UPDATE) {
        return {
            ...state,
            status,
            success,
        };
    } else {
        return initialState;
    }
}

export default asyncForm;