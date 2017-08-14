import React, { Component } from 'react';
import _ from 'lodash';
import StateConnection from '../HOCs/stateConnection';
import Map from './map';

class Restaurants extends Component {
  componentWillMount() {
    this.props.clearSearchedRestaurants();
    this.preLoadState(this.props.location.query.q);
  }

  preLoadState(keyword) {
    const { searchInName, searchInSuburb, searchInCity, searchInCuisine } = this.props;
    searchInName(keyword);
    searchInSuburb(keyword);
    searchInCity(keyword);
    searchInCuisine(keyword);

    // Use HTML5 native Navigator object to locate current position.
    navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
  }

  showPosition(position) {
    this.props.searchRestaurantsNearby(position.coords);
  }

  appendComma(term) {
    return `, ${term}`;
  }

  renderRestaurants() {
    const restaurants = this.props.searched_restaurants;
    
    if (!restaurants) {
      return <strong>Loading awesome restaurants...</strong>
    }

    return (
      restaurants.map((res) => {
        return (
          <div className="row w-75" key={res._id}>
            <div className="col-xs-12 w-100">
              <div className="restaurant-info">
                <div className="restaurant-heading">
                  <div className="resto-name">{res.name}</div>
                  <div className="resto-suburb">{res.suburb}</div>
                  <div className="resto-address">
                    <span>{res.address}</span>
                    <span>{this.appendComma(res.suburb)}</span>
                    <span>{this.appendComma(res.city)}</span>
                  </div>
                </div>
                <hr />
                <div className="restaurant-details">
                  <dl className="row">
                    <dt className="col-sm-2">cuisines:</dt>
                    <dd className="col-sm-10">{res.cuisines.join(', ')}</dd>
                  </dl>
                  <dl className="row">
                    <dt className="col-sm-2">phone:</dt>
                    <dd className="col-sm-10">{res.tel}</dd>
                  </dl>
                </div>
                <hr />
                <div className="resto-maps">
                  <Map 
                    lat={Number(res.location.lat)}
                    lng={Number(res.location.lng)}
                    defaultZoom={20}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  }

  renderNearbyRestaurants() {
    const { searched_restaurants, nearby_restaurants } = this.props;
    const filteredNearbyRestaurants = nearby_restaurants.filter(near => {
      return searched_restaurants.every(searched => {
        return near._id !== searched._id;
      })
    });

    if (filteredNearbyRestaurants && filteredNearbyRestaurants.length > 0) {
      return (
        <div className="d-flex align-items-center flex-column">
          <h5>Also nearby restaurants...</h5>
          {
            filteredNearbyRestaurants.map(res => {
              return (
                <div className="row w-75" key={res._id}>
                  <div className="col-xs-12 w-100">
                    <div className="restaurant-info">
                      <div className="restaurant-heading">
                        <div className="resto-name">{res.name}</div>
                        <div className="resto-suburb">{res.suburb}</div>
                        <div className="resto-address">
                          <span>{res.address}</span>
                          <span>{this.appendComma(res.suburb)}</span>
                          <span>{this.appendComma(res.city)}</span>
                        </div>
                      </div>
                      <hr />
                      <div className="restaurant-details">
                        <dl className="row">
                          <dt className="col-sm-2">cuisines:</dt>
                          <dd className="col-sm-10">{res.cuisines.join(', ')}</dd>
                        </dl>
                        <dl className="row">
                          <dt className="col-sm-2">phone:</dt>
                          <dd className="col-sm-10">{res.tel}</dd>
                        </dl>
                      </div>
                      <hr />
                      <div className="resto-maps">
                        <Map 
                          lat={Number(res.location.lat)}
                          lng={Number(res.location.lng)}
                          defaultZoom={20}
                        />
                      </div>
                    </div>
                  </div>
                  </div>
              );
            })
          }
        </div>
      );
    }
  }

  render() {
    return (
      <section className="restaurants">
        <div className="container">
          <div>
            <h2 className="text-center">
              {`Restaurants matching "${this.props.location.query.q}"`}
            </h2>
            <div className="d-flex align-items-center flex-column">
              {this.renderRestaurants()}
            </div>
          </div>
          {this.renderNearbyRestaurants()}
        </div>
      </section>
    );
  }
}

export default StateConnection(Restaurants);