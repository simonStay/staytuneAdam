import {
  SIGN_UP,
  LOGIN,
  GET_USER_DETAILS,
  CREATE_USER_PROFILE,
  GET_AVATAR_IMAGES,
  SELECT_AVATAR_IMAGE,
  FORGOT_PASSWORD,
} from "../actions/user"

export default function user(state = {}, action) {
  console.log("action_123:", action)
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        register: action.payload,
      }
    case LOGIN:
      return {
        ...state,
        login: action.payload.user,
      }
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      }
    case CREATE_USER_PROFILE:
      return {
        ...state,
        userProfileInfo: action.payload,
      }
    case GET_AVATAR_IMAGES:
      return {
        ...state,
        avatarImages: action.payload,
      }
    case SELECT_AVATAR_IMAGE:
      return {
        ...state,
        selectAvatarImage: action.playload,
      }
    case FORGOT_PASSWORD:
      return {
        ...state,
        passwordCode: action.payload,
      }
  }
  return state
}
