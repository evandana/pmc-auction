import {
    SET_IMAGES,
} from '../constants';

function images(state = [], action) {
    const { images = [], type } = action;
    if (type === SET_IMAGES) {
        const updatedState = [];
        return images;        
    } else {
        return state;
    }
}

export default images;
