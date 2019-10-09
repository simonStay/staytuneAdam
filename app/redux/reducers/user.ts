import { SIGN_UP, LOGIN } from "../actions/user"

export default function user(state = {}, action) {
    console.log("action_123:", action)
    switch (action.type) {
        case SIGN_UP:
            return action.payload
        case LOGIN:
            return action.payload
    }
    return state;
}
