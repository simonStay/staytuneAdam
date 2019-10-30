import { combineReducers } from "redux"
import list from "./list"
import user from "./user"
import travel from "./travel"
import places from "./places"

const rootReducer = combineReducers({
  list: list,
  user: user,
  travel: travel,
  places: places,
})

export default rootReducer
