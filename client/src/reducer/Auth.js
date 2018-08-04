import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_SIGNUP_ERROR} from "../action/type";

const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {...state, authenticated: true, user: action.payload}
        case UNAUTH_USER:
            return {...state, authenticated: false}
        case AUTH_ERROR: 
            return {...state, error: action.payload}
        case AUTH_SIGNUP_ERROR:
            return {...state, error_signup: action.payload}
        default:
            return state
    }
}

export default AuthReducer