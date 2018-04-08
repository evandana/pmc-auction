import {
    // raffles
    REFRESH_RAFFLES,
} from '../constants'

const defaultRaffleState = [];


function raffles(state = defaultRaffleState, action) {

    const { 
        raffles,
        ...rest
    } = action;


    switch (action.type) {
            
        case REFRESH_RAFFLES: 
        
            return [
                ...raffles,
            ];

        default:
            return state
    }
}

export default raffles;
