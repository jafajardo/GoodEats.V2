import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default (ComposedComponent) => {
  class StateConnection extends Component {
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.user.authenticated,
      searched_restaurants: state.restaurants.searched_restaurants,
      nearby_restaurants : state.restaurants.nearby_restaurants
    }
  }

  return connect(mapStateToProps, actions)(StateConnection);
}