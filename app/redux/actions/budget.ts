import resToBody from "../resToBody/resToBody"
export const GET_BUDGET_BY_TRAVEL_ID = "GET_BUDGET_BY_TRAVEL_ID"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com"

export function getBudgetByTravelId(id) {
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `/budget-info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id
            }),
        })
        const body = await resToBody(res)
        // console.log("body_123:", body)
        return dispatch({
            type: GET_BUDGET_BY_TRAVEL_ID,
            payload: body,
        })
    }
}

export default {
    getBudgetByTravelId,
    GET_BUDGET_BY_TRAVEL_ID
}
