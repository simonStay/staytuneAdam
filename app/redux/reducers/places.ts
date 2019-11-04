import { LOADER_LOCATIONS, TOURIST_LOCATIONS, FILTERED_LOCATIONS } from "./../actions/places"

export default function places(state = {}, action) {
  switch (action.type) {
    case TOURIST_LOCATIONS:
      return {
        ...state,
        loader: false,
        touristLocations: action.payload,
      }
    case LOADER_LOCATIONS:
      return {
        ...state,
        loader: action.payload,
      }
    case FILTERED_LOCATIONS:
      return {
        ...state,
        filteredLocations: action.payload
      }
  }
  return state
}
