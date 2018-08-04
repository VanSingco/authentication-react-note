import React, { Component } from 'react';
import Header from '../layout/Header';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {authSignin} from '../../action/Auth';

class SignIn extends Component {

  onSubmit = (user) => {
    this.props.dispatch(authSignin(user, this.props.history))
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Header />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h1 className="display-4 text-center mb-5">SignIn</h1>

                    {this.props.auth_error && (                 

                    <div className="alert alert-danger alert-dismissible fade show">
                        <strong>Oops!</strong> {this.props.auth_error}
                        <button type="button" className="close">
                            <span>&times;</span>
                        </button>
                    </div>
                    )}
                  <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="form-group">
                       <Field name="email" component={renderField} type="email" placeholder="Email Address" className="form-control" label="Email"/>
                    </div>
                    <div className="form-group">
                       <Field name="password" component={renderField} type="password" placeholder="Password" className="form-control" label="Password"/>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" disabled={pristine || submitting}>SignIn</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};
  if(!values.email) errors.email = 'Please enter an email';
  if(!values.password) errors.password ='Please enter a password';
  return errors;
}

const renderField = ({
  input,
  label,
  type,
  meta: {touched, error}
}) => {
  return (
    <div>
      <input {...input} placeholder={label} type={type} className={`form-control ${touched && error ? 'is-invalid' : ''}`}/>
      {touched && (error && <div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

const mapStateToProps = (state) => ({
    auth_error: state.auth.error
})

SignIn = connect(mapStateToProps)(SignIn)

export default reduxForm({
    form: 'SignInForm',
    validate
})(SignIn)
