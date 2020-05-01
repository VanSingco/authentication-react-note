import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import RequredAuth from '../component/auth/requredAuth';
import { connect } from "react-redux";
import Landing from '../component/pages/Landing';
import Home from '../component/pages/Home';
import SignIn from '../component/auth/SignIn';
import SignUp from '../component/auth/SignUp';


const AppRoute = (props) => (
    <BrowserRouter>
        <Switch>
             <Route exact path="/" component={props.authenticated ? RequredAuth(Home) : Landing} />
             <PublicRoute authenticated={props.authenticated} exact path="/signin" component={SignIn} />
             <PublicRoute authenticated={props.authenticated} exact path="/signup" component={SignUp} />
        </Switch>
    </BrowserRouter>
)
const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
})
export default connect(mapStateToProps)(AppRoute);

// Must be logged in for this route... Briefly shows '...' while loading account data rather than redirecting...
const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render={props => {
        return authenticated ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }}/>;
    }}
    />
);

const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render={props => {
        return  !authenticated ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />;
    }}
    />
);
