import { combineReducers } from "redux"
import list from "./list"
import user from "./user"
import travel from "./travel"

const rootReducer = combineReducers({
    list: list,
    user: user,
    travel: travel
})

export default rootReducer
