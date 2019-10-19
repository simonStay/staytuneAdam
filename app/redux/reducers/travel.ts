import {
    LOADER,
    TRAVEL_PREFERENCE_TYPES,
    SELECTED_TRAVEL_PREFERENCE,
    SET_TRAVEL_PREFERENCE,
    GET_CATEGORIES
} from "./../actions/travel"

export default function travel(state = {}, action) {
    switch (action.type) {
        case TRAVEL_PREFERENCE_TYPES:
            return {
                ...state,
                travelPreferenceTypes: action.payload,
                loader: false
            }
        case SELECTED_TRAVEL_PREFERENCE:
            return {
                ...state,
                selectedTravelPreferences: action.payload
            }
        case SET_TRAVEL_PREFERENCE:
            return {
                ...state,
                travelPreferenceInfo: action.payload,
                loader: false
            }
        case LOADER:
            return {
                ...state,
                loader: action.payload,
            }
    }
    return state
}