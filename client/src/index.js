import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './routes/AppRoute';
import ConfigStore from './reducer/ConfigStore';
import { AUTH_USER } from "./action/type";
import { fetchCurrentUser } from "./action/Auth";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

// styling
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './sass/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

const store = ConfigStore();

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({type: AUTH_USER})
    store.dispatch(fetchCurrentUser())
}

const App = (
    <Provider store={store}>
        <AppRoute />
    </Provider>
)

ReactDOM.render(App , document.getElementById('root'));
registerServiceWorker();
