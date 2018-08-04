import React, { Component } from 'react';
import Header from '../layout/Header';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { authSignup } from "../../action/Auth";

class SignUp extends Component {

  onSubmit = (user) => {
    this.props.dispatch(authSignup(user, this.props.history))
    console.log(user)
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card mt-5">
                <div className="card-body">
                 <h1 className="display-4 text-center mb-5">SignUp</h1>

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
                       <Field name="username" component={renderField} type="text" placeholder="Username" className="form-control" label="Username"/>
                    </div>
                     <div className="form-group">
                       <Field name="fullname" component={renderField} type="text" placeholder="Fullname" className="form-control" label="Fullname"/>
                    </div>
                    <div className="form-group">
                       <Field name="email" component={renderField} type="email" placeholder="Email Address" className="form-control" label="Email"/>
                    </div>
                    <div className="form-group">
                       <Field name="password" component={renderField} type="password" placeholder="Password" className="form-control" label="Password"/>
                    </div>
                    <div className="form-group">
                       <Field name="confirm_password" component={renderField} type="password" placeholder="Confirm Password" className="form-control" label="Confirm Password"/>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" disabled={pristine || submitting}>Sign Up</button>
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
  if(!values.username) errors.username = 'Please enter a username';
  if(!values.fullname) errors.fullname = 'Please enter a fullname';
  if(!values.email) errors.email = 'Please enter a email';
  if(!values.password) errors.password ='Please enter a password';
  if(!values.confirm_password) errors.confirm_password ='Please enter a confirm password';
  if (values.password !== values.confirm_password) errors.confirm_password = "Password not match";

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
  auth_error: state.auth.error_signup
});

SignUp = connect(mapStateToProps)(SignUp)

export default reduxForm({
    form: 'SignUpForm',
    validate
})(SignUp)
