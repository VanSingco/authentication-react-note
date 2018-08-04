import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../action/Auth";
import PropTypes from 'prop-types';

class Header extends Component {

  onSignOut = () => {
    this.props.signOut(this.context.router.history)
  }

  onRender = () => {
    if (this.props.authenticated) {
        if (!this.props.user) {
            return 'Loading'
        }
        return (
            <ul className="navbar-nav">
                <li className="nav-item active d-flex align-items-center">
                    <NavLink to="/" exact activeClassName="active" className="nav-link">Home</NavLink>
                </li>
                 <li className="nav-item dropdown d-flex align-items-center">
                    <a className="d-flex align-items-center nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={this.props.user.photo} alt={this.props.user.username} className="nav-profile-img" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <NavLink to="/profile" exact activeClassName="active" className="dropdown-item">Profile</NavLink>
                        <a href="#" onClick={this.onSignOut} className="dropdown-item">Signout</a>
                    </div>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/signin" exact activeClassName="active" className="nav-link">SignIn</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" exact activeClassName="active" className="nav-link">SignUp</NavLink>
                </li>
            </ul>
        )
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <NavLink to="/" exact activeClassName="active" className="navbar-brand">Singco</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse justify-content-end navbar-collapse nav-margin-rigth" id="navbarNav">
                {this.onRender()}
            </div>
         </nav>
      </div>
    )
  }
}

Header.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {signOut})(Header);