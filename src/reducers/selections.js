import {SELECT_RAMEN} from '../actions/selections';

const initialState = {
    selected: null
}

export default function reducer(state = initialState, action) {

    if (action.type === SELECT_RAMEN) {
        return Object.assign({}, state, {
            selected: action.selected
        });
    }

    return state;
}