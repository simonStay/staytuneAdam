
import resToBody from '../resToBody/resToBody';
export const SIGN_UP = "SIGN_UP"
export const LOGIN = "LOGIN"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"

export function signUp(fullName, email, password) {
    return async dispatch => {
        const res = await fetch(
            STAYTUNELIVEURL + `users`,
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

export function Login(email, password) {
    return async dispatch => {
        const res = await fetch(
            STAYTUNELIVEURL + `users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }
        );
        const body = await resToBody(res);
        console.log("body_123:", body)
        return dispatch({
            type: LOGIN,
            payload: body
        });
    }
}

export default {
    signUp,
    Login,
    SIGN_UP,
    LOGIN
}