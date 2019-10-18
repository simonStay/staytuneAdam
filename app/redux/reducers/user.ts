import {
  SIGN_UP,
  LOGIN,
  GET_USER_DETAILS,
  CREATE_USER_PROFILE,
  GET_AVATAR_IMAGES,
  FORGOT_PASSWORD,
  LOADER,
  SIGN_OUT,
} from "../actions/user"

export default function user(state = {}, action) {
  console.log("action_123:", action)
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        register: action.payload,
        loader: false,
      }
    case LOGIN:
      return {
        ...state,
        loader: false,
        login: action.payload,
      }
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
        loader: false,
      }
    case CREATE_USER_PROFILE:
      return {
        ...state,
        userProfileInfo: action.payload,
        loader: false,
      }
    case GET_AVATAR_IMAGES:
      return {
        ...state,
        avatarImages: action.payload,
        loader: false,
      }
    case FORGOT_PASSWORD:
      return {
        ...state,
        passwordCode: action.payload,
        loader: false,
      }
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      }
    case SIGN_OUT:
      return {
        user: {},
      }
  }
  return state
}
