import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const USERNAME_TAKEN = 'USERNAME_TAKEN';
export const usernameTaken = () => ({
    type: USERNAME_TAKEN
})

export const registerUser = (username) => dispatch => {
    return fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(username)
    })
        .then(res =>  {
            return normalizeResponseErrors(res)
        })
        .then(res => {
            console.log(res)
            res.json()
        })
        .then((res) => console.log(res))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            } else {
                //Having trouble getting the proper message, but considering that
                // the client side already handles password validation, we can assume that
                // if the request fails, it's due to a taken username.
                if (message === 'Bad Request') {
                    dispatch(usernameTaken())
                }
            }
        });
};
