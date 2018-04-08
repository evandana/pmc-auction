import {
    ASYNC_FORM_STATUS_UPDATE,
} from '../constants';

const initialState = {};

function asyncForm(state = initialState, action) {
    const { type, statusObj} = action;

    if (type === ASYNC_FORM_STATUS_UPDATE) {
        return {
            ...state,
            ...statusObj
        };
    } else {
        return initialState;
    }
}

export default asyncForm;