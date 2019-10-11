import resToBody from "../resToBody/resToBody"
export const SIGN_UP = "SIGN_UP"
export const LOGIN = "LOGIN"
export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const GET_USER_DETAILS = "GET_USER_DETAILS"
export const CREATE_USER_PROFILE = "CREATE_USER_PROFILE"
export const GET_AVATAR_IMAGES = "GET_AVATAR_IMAGES"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"

export function signUp(fullName, email, password) {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: fullName,
                email: email,
                password: password,
            }),
        })
        const body = await resToBody(res)
        // console.log("signUp_123:", body)
        return dispatch({
            type: SIGN_UP,
            payload: body,
        })
    }
}

export function Login(email, password) {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        const body = await resToBody(res)
        // console.log("Login_123:", body)
        return dispatch({
            type: LOGIN,
            payload: body,
        })
    }
}

export function ForgotPassword(email) {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `user/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        const body = await resToBody(res)
        console.log("body_123:", body)
        return dispatch({
            type: FORGOT_PASSWORD,
            payload: body,
        })
    }
}

export function getUserDetails(userId, token) {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `users/` + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const body = await resToBody(res)
        // console.log("getUserDetails_123:", body)
        return dispatch({
            type: GET_USER_DETAILS,
            payload: body,
        })
    }
}

export function createUserProfile(userInfoObj) {
    return async dispatch => {
        const res = await fetch(
            STAYTUNELIVEURL + `users/` + userInfoObj.userId,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "verified": true,
                    "firstname": userInfoObj.firstname,
                    "lastname": userInfoObj.lastname,
                    "city": userInfoObj.city,
                    "state": userInfoObj.state,
                    "zip": userInfoObj.zip,
                    "profilePic": userInfoObj.profilePic
                })
            }
        );
        const body = await resToBody(res);
        console.log("createUserProfile_actions:", body)
        return dispatch({
            type: CREATE_USER_PROFILE,
            payload: body
        });
    }
}

export function getAvatarImages() {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `/avathars/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const body = await resToBody(res)
        // console.log("getAvatarImages_123:", body)
        return dispatch({
            type: GET_AVATAR_IMAGES,
            payload: body,
        })
    }
}

export default {
    signUp,
    Login,
    getUserDetails,
    createUserProfile,
    getAvatarImages,
    ForgotPassword,
    SIGN_UP,
    LOGIN,
    GET_USER_DETAILS,
    CREATE_USER_PROFILE,
    GET_AVATAR_IMAGES,
    FORGOT_PASSWORD
}
