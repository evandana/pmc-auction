import {
    SET_CURRENT_USER,
} from '../constants';

const defaultUser = {
    permissions: {},
    name: '',
    uid: '',
};

function user(state = defaultUser, action) {
    const { type, ...rest } = action;
    
    if (type === SET_CURRENT_USER) {
        return {
            ...rest,
        };
    } else {
        return state;
    }
}

export default user;