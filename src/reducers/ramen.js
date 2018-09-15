import {GET_RAMEN_DATA} from '../actions/ramen';

const initialState = {
    data: []
}

export default function reducer(state = initialState, action) {

    if (action.type === GET_RAMEN_DATA) {
        return Object.assign({}, state, {
            data: action.data
        });
    }

    return state;
}