import { API_BASE_URL } from '../config';

export const GET_RAMEN_DATA = 'GET_RAMEN_DATA';
export const saveRamenData = (data) => ({
    type: GET_RAMEN_DATA,
    data: data
})

export const GET_TAG_DATA = 'GET_TAG_DATA';
export const saveTagData = (data) => ({
    type: GET_TAG_DATA,
    data: data
})

export const GET_COMPANY_DATA = 'GET_COMPANY_DATA';
export const saveCompanyData = (data) => ({
    type: GET_COMPANY_DATA,
    data: data
})

export const getRamenData = () => (dispatch) => {

    return fetch(`${API_BASE_URL}/ramen`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
        let resp = result;
        for (let i=0; i<result.length; i++) {
            try {
                let totalRatings = []
                for (let j=0; j<result[i].ratings.length; j++) {
                    totalRatings.push(result[i].ratings[j].overall);
                }
                resp[i].overallRating = Math.round((totalRatings.reduce((a,b) => a+b) / totalRatings.length) * 10) / 10;
            } catch(e) {
                resp[i].overallRating = 'Not yet rated'
            }
        }
        dispatch(saveRamenData(resp))
        return resp;
    })
    .catch(err => console.log(err))
}

export const getTagData = () => (dispatch) => {

    return fetch(`${API_BASE_URL}/tags`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
        dispatch(saveTagData(result))
        return result;
    })
    .catch(err => console.log(err))
}

export const getCompanyData = () => (dispatch) => {

    return fetch(`${API_BASE_URL}/company`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
        dispatch(saveCompanyData(result))
        return result;
    })
    .catch(err => console.log(err))
}

export const submitRamenReview = (ramenId, postBody) => (dispatch) => {

    return fetch(`${API_BASE_URL}/rating/${ramenId}`, {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
            // Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
        dispatch(getRamenData());
        return result;
    })
    .catch(err => console.log(err))
}