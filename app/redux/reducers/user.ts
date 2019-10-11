import {
    SIGN_UP,
    LOGIN,
    GET_USER_DETAILS,
    CREATE_USER_PROFILE,
    GET_AVATAR_IMAGES,
} from "../actions/user"

export default function user(state = {}, action) {
    console.log("action_123:", action)
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                register: action.payload
            }
        case LOGIN:
            return {
                ...state,
                login: action.payload.user
            }
        case GET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload
            }
        case CREATE_USER_PROFILE:
            return {
                ...state,
                userProfileInfo: action.payload
            }
        case GET_AVATAR_IMAGES:
            return {
                ...state,
                avatarImages: action.payload
            }
    }
    return state;
}
