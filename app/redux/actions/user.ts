
import resToBody from '../resToBody/resToBody';
export const SIGN_UP = "SIGN_UP"

export function signUp(fullName, email, password) {
    return async dispatch => {
        const res = await fetch(
            `https://staytune.austinconversionoptimization.com/users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fullname": fullName,
                    "email": email,
                    "password": password
                })
            }
        );
        const body = await resToBody(res);
        console.log("body_123:", body)
        return dispatch({
            type: SIGN_UP,
            payload: body
        });
    }
}

export default {
    SIGN_UP,
    signUp,
}