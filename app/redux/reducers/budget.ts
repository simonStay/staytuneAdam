import {
    GET_BUDGET_BY_TRAVEL_ID
} from "./../actions/budget"

export default function budget(state = {}, action) {
    switch (action.type) {
        case GET_BUDGET_BY_TRAVEL_ID:
            return {
                ...state,
                budgetByTravelId: action.payload,
            }
    }
    return state
}
