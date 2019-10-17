import {
    LOADER,
    TRAVEL_CATEGORIES,
    SELECTED_TRAVEL_CATEGORIES,
    SET_BUDGET_INFO
} from "./../actions/travel"

export default function travel(state = {}, action) {
    switch (action.type) {
        case TRAVEL_CATEGORIES:
            return {
                ...state,
                travelCategories: action.payload,
                loader: false
            }
        case SELECTED_TRAVEL_CATEGORIES:
            return {
                ...state,
                selectedTravelCategories: action.payload
            }
        case SET_BUDGET_INFO:
            return {
                ...state,
                setTravelBudget: action.payload,
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