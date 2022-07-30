import {
    REGISTER_FOR_EVENT,
    CANCEL_REGISTRATION,
    LOGGED_IN
} from "./actions"

const initialState = {
    data: null,
    username: null
}

function Reducers(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.data.data
            }
        default:
            return state
    }
}

export default Reducers;