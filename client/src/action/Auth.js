import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, AUTH_SIGNUP_ERROR} from "./type";
import axios from 'axios';

export const authSignin = (user, history) => (dispatch) => {
        // submit email and password to the server
        axios.post('/auth/signin', user).then((user) => {
            // if request is good update state to indicate user is authenticated
        dispatch({type: AUTH_USER, payload: user.data.user});
        // save the JWT localStorage
        localStorage.setItem('token', user.data.token);
        // redirect user to homepage
        history.push('/');

     }).catch(() => {
        //  if request is bad show the error
        dispatch({type: AUTH_ERROR, payload: "Email and Password don't match"})
     });
}

export const authSignup = (user, history) => (dispatch) => {
        // submit email and password to the server
        axios.post('/auth/signup', user).then((response) => {
            // if request is good update state to indicate user is authenticated
        dispatch({type: AUTH_USER, payload: response.data.user});
        // save the JWT localStorage
        localStorage.setItem('token', response.data.token);
        // redirect user to homepage
        history.push('/');

     }).catch((error) => {
        //  if request is bad show the error
        dispatch({type: AUTH_SIGNUP_ERROR, payload: error.response.data.error});
     });
}

export const fetchCurrentUser = () => async(dispatch) => {
    const request = await axios.get('/api/current_user', {
        headers: {authorization: localStorage.getItem('token')}
    })
    console.log(request.data)
    dispatch({type: AUTH_USER, payload: request.data})
}



export const signOut = (history) => (dispatch) => {
    //sigout request to server
    axios.get('/api/signout');
    // remove the token to localStorage
    localStorage.removeItem('token')
    // authenticated to false
    dispatch({type: UNAUTH_USER})
    // redirect to landing page
    history.push('/');
}