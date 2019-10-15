import { TRAVEL_CATEGORIES, SELECTED_TRAVEL_CATEGORIES } from "./../actions/travel"

export default function travel(state = {}, action) {
    switch (action.type) {
        case TRAVEL_CATEGORIES:
            return {
                ...state,
                travelCategories: action.payload
            }
        case SELECTED_TRAVEL_CATEGORIES:
            return {
                ...state,
                selectedTravelCategories: action.payload
            }
    }
    return state
}