import { combineReducers } from "redux"
import list from "./list"
import user from "./user"

const rootReducer = combineReducers({
    list: list,
    user: user
})

export default rootReducer
