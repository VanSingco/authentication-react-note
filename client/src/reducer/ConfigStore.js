import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import Auth from './Auth';
import { reducer as formReducer } from "redux-form";

export default () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            form: formReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
};