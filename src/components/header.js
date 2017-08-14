import React, { Component } from 'react';
import { Link } from 'react-router';
import StateConnection from '../HOCs/stateConnection';

class Header extends Component {
  handleOnClickSignout() {
    this.props.signout();
  }

  renderNav() {
    if (this.props.authenticated || localStorage.getItem('token')) {
      return (
        <div className="navbar-nav">
          <a className="nav-item nav-link" onClick={this.handleOnClickSignout.bind(this)}>SignOut</a>
          <Link className="nav-item nav-link" to="addRestaurant">Add a Restaurant</Link>
        </div>
      );
    }
  
    return (
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="signin">SignIn</Link>
        <Link className="nav-item nav-link" to="signup">SignUp</Link>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse">
        <Link className="navbar-brand" to="/">Good Eats</Link>
        <div className="collapse navbar-collapse">
          {this.renderNav()}
        </div>
      </nav>
    );
  }
}

export default StateConnection(Header);