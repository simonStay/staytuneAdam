import {
  LOADER,
  TRAVEL_PREFERENCE_TYPES,
  SELECTED_TRAVEL_PREFERENCE,
  SET_TRAVEL_PREFERENCE,
  SET_TRAVEL_INFO,
  USER_SAVED_LOCATIONS,
  UPDATE_TRAVEL_PREFERENCE,
} from "./../actions/travel"

export default function travel(state = {}, action) {
  switch (action.type) {
    case TRAVEL_PREFERENCE_TYPES:
      return {
        ...state,
        loader: false,
        travelPreferenceTypes: action.payload,
      }
    case SELECTED_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        selectedTravelPreferences: action.payload,
      }
    case SET_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        travelPreferenceInfo: action.payload,
      }
    case UPDATE_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        updatetravelPreferenceInfo: action.payload,
      }
    case SET_TRAVEL_INFO:
      return {
        ...state,
        loader: false,
        travelInfo: action.payload,
      }
    case USER_SAVED_LOCATIONS:
      return {
        ...state,
        loader: false,
        savedLocations: action.payload,
      }
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      }
  }
  return state
}
