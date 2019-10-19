import resToBody from "../resToBody/resToBody"
export const LOADER = "LOADER"
export const TRAVEL_PREFERENCE_TYPES = "TRAVEL_PREFERENCE_TYPES"
export const SELECTED_TRAVEL_PREFERENCE = "SELECTED_TRAVEL_PREFERENCE"
export const SET_TRAVEL_PREFERENCE = "SET_TRAVEL_PREFERENCE"
export const USER_TRAVEL_PREFERENCE = "USER_TRAVEL_PREFERENCE"
export const USER_SAVED_LOCATIONS = "USER_SAVED_LOCATIONS"
export const SET_TRAVEL_INFO = "SET_TRAVEL_INFO"
export const UPDATE_TRAVEL_PREFERENCE = "UPDATE_TRAVEL_PREFERENCE"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"

export function travelPreferenceTypes() {
    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
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
}

export function selectedTravelPreferences(preferences) {
    return async dispatch => {
        return dispatch({
            type: SELECTED_TRAVEL_PREFERENCE,
            payload: preferences
        })
    }
}

export function setBudgeInfo(setTravelBudget) {
    return async dispatch => {
        dispatch({
            type: SET_TRAVEL_INFO,
            payload: setTravelBudget
        })
    }
}

export function setTravelPreferences(setTravelBudget) {
    console.log('setTravelBudget.selectedCategories_123:', setTravelBudget.selectedCategories)
    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
        const res = await fetch(STAYTUNELIVEURL + `/travel-preferences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedTravelPreferences: setTravelBudget.selectedTravelPreferences,
                personsCount: setTravelBudget.personsCount,
                daysCount: setTravelBudget.daysCount,
                totalBudget: setTravelBudget.totalBudget,
                city: setTravelBudget.city,
                userId: setTravelBudget.userId,
                locationImage: setTravelBudget.locationImage,
                travelDate: setTravelBudget.travelDate,
                selectedCategories: setTravelBudget.selectedCategories
            }),
        })
        const body = await resToBody(res)
        // console.log("body_123:", body)
        return dispatch({
            type: SET_TRAVEL_PREFERENCE,
            payload: body,
        })
    }
}

export function updateTravelPreferences(setTravelBudget) {
    console.log('setTravelBudget.selectedCategories_123:', setTravelBudget.selectedCategories)
    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
        const res = await fetch(STAYTUNELIVEURL + `/travel-preferences/` + setTravelBudget.preferenceId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedTravelPreferences: setTravelBudget.selectedTravelPreferences,
                personsCount: setTravelBudget.personsCount,
                daysCount: setTravelBudget.daysCount,
                totalBudget: setTravelBudget.totalBudget,
                city: setTravelBudget.city,
                userId: setTravelBudget.userId,
                locationImage: setTravelBudget.locationImage,
                travelDate: setTravelBudget.travelDate,
                selectedCategories: setTravelBudget.selectedCategories
            }),
        })
        const body = await resToBody(res)
        // console.log("body_123:", body)
        return dispatch({
            type: UPDATE_TRAVEL_PREFERENCE,
            payload: body,
        })
    }
}

export function userSavedLocations(userId) {

    return async dispatch => {
        dispatch({
            type: LOADER,
            payload: true,
        })
        const res = await fetch(STAYTUNELIVEURL + `/travel-preferences/userId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId
            }),
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
    setTravelPreferences,
    userSavedLocations,
    setBudgeInfo,
    updateTravelPreferences,
    SELECTED_TRAVEL_PREFERENCE,
    TRAVEL_PREFERENCE_TYPES,
    SET_TRAVEL_PREFERENCE,
    LOADER,
    USER_TRAVEL_PREFERENCE,
    USER_SAVED_LOCATIONS,
    SET_TRAVEL_INFO,
    UPDATE_TRAVEL_PREFERENCE
}
