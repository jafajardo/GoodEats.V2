import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit(formProps) {
    this.props.signin(formProps);
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="input-wrapper">
          <fieldset className="form-group">
            <label>Email:</label>
            <input className="form-control" {...email} />
            {email.touched && email.error && <div className="alert alert-danger">{email.error}</div>}
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <input className="form-control" {...password} type="password" />
            {password.touched && password.error && <div className="alert alert-danger">{password.error}</div>}
          </fieldset>
          <button className="btn btn-warning">Sign In</button>
        </div>
      </form>
    );
  }
}

function validateEmail(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
}

function validate(formProps) {
  const errors = {};
  const { email, password } = formProps;
  
  if (!email) {
    errors.email = 'Email is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate
}, null, actions)(Signin);