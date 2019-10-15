import resToBody from "../resToBody/resToBody"
export const TRAVEL_CATEGORIES = "TRAVEL_CATEGORIES"
export const SELECTED_TRAVEL_CATEGORIES = "SELECTED_TRAVEL_CATEGORIES"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"

export function travelCategories() {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const body = await resToBody(res)
        // console.log("travelCategories:", body)
        return dispatch({
            type: TRAVEL_CATEGORIES,
            payload: body,
        })
    }
}

export function selectedTravelCategories(categories) {
    return async dispatch => {
        return dispatch({
            type: SELECTED_TRAVEL_CATEGORIES,
            payload: categories
        })
    }
}

export default {
    travelCategories,
    selectedTravelCategories,
    SELECTED_TRAVEL_CATEGORIES,
    TRAVEL_CATEGORIES
}
