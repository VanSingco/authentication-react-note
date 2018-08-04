import React from 'react';
import { Route,BrowserRouter, Switch } from "react-router-dom";
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
             <Route exact path="/signin" component={SignIn} />
             <Route exact path="/signup" component={SignUp} />
        </Switch>
    </BrowserRouter>
)
const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
})
export default connect(mapStateToProps)(AppRoute);
