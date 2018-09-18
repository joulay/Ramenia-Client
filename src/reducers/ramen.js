import {GET_RAMEN_DATA, GET_TAG_DATA, GET_COMPANY_DATA} from '../actions/ramen';

const initialState = {
    data: [],
    tagData: [],
    companyData: []
}

export default function reducer(state = initialState, action) {

    if (action.type === GET_RAMEN_DATA) {
        return Object.assign({}, state, {
            data: action.data
        });
    } else if (action.type === GET_TAG_DATA) {
        return Object.assign({}, state, {
            tagData: action.data 
        })
    } else if (action.type === GET_COMPANY_DATA) {
        return Object.assign({}, state, {
            companyData: action.data 
        })
    }

    return state;
}