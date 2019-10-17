import resToBody from "../resToBody/resToBody"
export const LOADER = "LOADER"
export const TRAVEL_CATEGORIES = "TRAVEL_CATEGORIES"
export const SELECTED_TRAVEL_CATEGORIES = "SELECTED_TRAVEL_CATEGORIES"
export const SET_BUDGET_INFO = "SET_BUDGET_INFO"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"

export function travelCategories() {
    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
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
}

export function selectedTravelCategories(categories) {
    return async dispatch => {
        return dispatch({
            type: SELECTED_TRAVEL_CATEGORIES,
            payload: categories
        })
    }
}
export function setBudgetInfo(setTravelBudget) {
    // return async dispatch => {
    //     dispatch({
    //         type: LOADER,
    //         payload: false,
    //     })
    return async dispatch => {
        return dispatch({
            type: SET_BUDGET_INFO,
            payload: setTravelBudget
        })
    }
    // }
}

export default {
    travelCategories,
    selectedTravelCategories,
    setBudgetInfo,
    SELECTED_TRAVEL_CATEGORIES,
    TRAVEL_CATEGORIES,
    SET_BUDGET_INFO,
    LOADER
}
