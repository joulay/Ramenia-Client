import { API_BASE_URL } from '../config';

export const GET_RAMEN_DATA = 'GET_RAMEN_DATA';
export const saveRamenData = (data) => ({
    type: GET_RAMEN_DATA,
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