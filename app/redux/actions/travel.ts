import resToBody from "../resToBody/resToBody"
export const LOADER = "LOADER"
export const TRAVEL_PREFERENCE_TYPES = "TRAVEL_PREFERENCE_TYPES"
export const SELECTED_TRAVEL_PREFERENCE = "SELECTED_TRAVEL_PREFERENCE"
export const SET_BUDGET_INFO = "SET_BUDGET_INFO"
export const USER_TRAVEL_PREFERENCE = "USER_TRAVEL_PREFERENCE"
export const USER_SAVED_LOCATIONS = "USER_SAVED_LOCATIONS"

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

export function userTravelPreferences(perferences) {
    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
        const res = await fetch(STAYTUNELIVEURL + `/travel-preferences`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedTravelPreferences: [
                    "string"
                ],
                userId: "string",
                personsCount: 0,
                daysCount: 0,
                totalBudget: "string",
                city: "string",
                locationImage: "string",
                travelDate: "string"
            }),
        })
        const body = await resToBody(res)
        console.log("createUserProfile_actions:", body)
        return dispatch({
            type: USER_TRAVEL_PREFERENCE,
            payload: body,
        })
    }
}

export function userSavedLocations(perferences) {
    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
        const res = await fetch(STAYTUNELIVEURL + `/travel-preferences`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const body = await resToBody(res)
        console.log("createUserProfile_actions:", body)
        return dispatch({
            type: USER_SAVED_LOCATIONS,
            payload: body,
        })
    }
}

export default {
    travelPreferenceTypes,
    selectedTravelPreferences,
    setBudgetInfo,
    userTravelPreferences,
    userSavedLocations,
    SELECTED_TRAVEL_PREFERENCE,
    TRAVEL_PREFERENCE_TYPES,
    SET_BUDGET_INFO,
    LOADER,
    USER_TRAVEL_PREFERENCE,
    USER_SAVED_LOCATIONS
}
