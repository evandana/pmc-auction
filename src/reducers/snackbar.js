import {
    // raffles
    UPDATE_SNACKBAR,
} from '../constants'

const defaultSnackbarState = {
    open: false,
    message: '',
};


function snackbar(state = defaultSnackbarState, action) {

    const { 
        open,
        message,
        ...rest
    } = action;


    switch (action.type) {
            
        case UPDATE_SNACKBAR: 
        
            return {
                open,
                message,
            };

        default:
            return state
    }
}

export default snackbar;
