import resToBody from "../resToBody/resToBody"
export const LOADER_LOCATIONS = "LOADER_LOCATIONS"
export const TOURIST_LOCATIONS = "TOURIST_LOCATIONS"

export function touristLocations() {
  return async dispatch => {
    dispatch({
      type: LOADER_LOCATIONS,
      payload: true,
    })
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.78825,-122.4324&radius=60&type=tourist&&rankby=prominence&key=AIzaSyBI_ae3Hvrib8Bao3_WrhXLEHKuGj1J8pQ`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    const body = await resToBody(res)
    console.log("LOCATION_RES", JSON.stringify(body.results))
    return dispatch({
      type: TOURIST_LOCATIONS,
      payload: body.results,
    })
  }
}

export default {
  touristLocations,
  LOADER_LOCATIONS,
  TOURIST_LOCATIONS,
}
