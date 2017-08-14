import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signup(formProps);
  }

  render() {
    const { handleSubmit, fields: { name, email, password, passwordConfirm } } = this.props;
    return (
      <form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="input-wrapper">
          <fieldset className="form-group">
            <label>Name:</label>
            <input className="form-control" {...name} />
            {name.touched && name.error && <div className="alert alert-danger">{name.error}</div>}
          </fieldset>
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
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <input className="form-control" {...passwordConfirm} type="password" />
          </fieldset>
          <button className="btn btn-warning" action="submit">Sign Up</button>
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

  if (!formProps.name) {
    errors.name = 'Name is required';
  }

  if (!formProps.email) {
    errors.email = 'Email is required';
  }

  if (!formProps.password || !formProps.passwordConfirm) {
    errors.password = 'Password is required';
  }

  if (!validateEmail(formProps.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password', 'passwordConfirm'],
  validate
}, null, actions)(Signup);