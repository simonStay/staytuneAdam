import { SIGN_UP } from "../actions/user"

export default function user(state = {}, action) {
    switch (action.type) {
        case SIGN_UP:
            return { state }
    }
    return state;
}