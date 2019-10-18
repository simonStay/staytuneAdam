import resToBody from "../resToBody/resToBody"
export const LOADER = "LOADER"
export const TRAVEL_PREFERENCE_TYPES = "TRAVEL_PREFERENCE_TYPES"
export const SELECTED_TRAVEL_PREFERENCE = "SELECTED_TRAVEL_PREFERENCE"
export const SET_BUDGET_INFO = "SET_BUDGET_INFO"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"

export function travelPreferenceTypes() {
    // return async dispatch => {
    //     dispatch({
    //         type: LOADER,
    //         payload: true,
    //     })
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `/travel-preference-types`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const body = await resToBody(res)
        // console.log("travelCategories:", body)
        return dispatch({
            type: TRAVEL_PREFERENCE_TYPES,
            payload: body,
        })
    }
    //}
}

export function selectedTravelPreferences(preferences) {
    return async dispatch => {
        return dispatch({
            type: SELECTED_TRAVEL_PREFERENCE,
            payload: preferences
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
    travelPreferenceTypes,
    selectedTravelPreferences,
    setBudgetInfo,
    SELECTED_TRAVEL_PREFERENCE,
    TRAVEL_PREFERENCE_TYPES,
    SET_BUDGET_INFO,
    LOADER
}
