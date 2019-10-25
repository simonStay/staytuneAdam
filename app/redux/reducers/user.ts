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

import travel from './travel'

export default function user(state = {}, action) {
  console.log("action_123:", action)
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        loader: false,
        register: action.payload,
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
        loader: false,
        userDetails: action.payload,
      }
    case CREATE_USER_PROFILE:
      return {
        ...state,
        loader: false,
        userProfileInfo: action.payload,
      }
    case GET_AVATAR_IMAGES:
      return {
        ...state,
        loader: false,
        avatarImages: action.payload,
      }
    case FORGOT_PASSWORD:
      return {
        ...state,
        loader: false,
        passwordCode: action.payload,
      }
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      }
    case SIGN_OUT:
      return {
        loader: false,
        user: {},
      }
  }
  return state
}
