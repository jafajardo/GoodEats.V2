import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';
import Map from './map';

class AddRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      suburb: '',
      state: '',
      post: '',
      location: {}
    }
  }

  calculateGeocodeLocation = _.debounce(function() {
      if (this.state.address.length > 0 && this.state.suburb.length > 0) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': `${this.state.address} ${this.state.suburb}`}, (results, status) => {
          if (status === 'OK') {
            // Set state location.
            const lat = results[0].geometry.location.lat()
            const lng = results[0].geometry.location.lng();
            this.setState({ location: { lat, lng } });

            // Set other fields to autocomplete.
            results[0].address_components.forEach(component => {
              // console.log(component);
              component.types.forEach(type => {
                switch(type) {
                  case 'administrative_area_level_1': {
                    this.setState({ state: component.long_name });
                  }
                  case 'postal_code': {
                    this.setState({ post: component.long_name });
                  }
                }
              })
            })
          }
        });
      }
    }
  , 500, {leading: true, trailing: true})

  handleSuburbChange = (event, getLocation) => {
    this.setState({ suburb: event.target.value });
    this.calculateGeocodeLocation();
  }

  handleAddressChange = (event, getLocation) => {
    this.setState({ address: event.target.value });
    this.calculateGeocodeLocation();
  }

  handleFormSubmit(formProps) {
    const newRestaurant = formProps;
    newRestaurant.location = this.state.location;
    this.props.addRestaurant(newRestaurant);
  }

  render() {
    const { handleSubmit, fields: { name, address, suburb, city, state, post, phone, cuisine }} = this.props;

    return (
      <form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="input-wrapper">
          <fieldset className="form-group">
            <label>Restaurant Name:</label>
            <input className="form-control" {...name} />
            {name.touched && name.error && <div className="alert alert-danger">{name.error}</div>}
          </fieldset>

          <fieldset className="form-group">
            <label>Address:</label>
            <input className="form-control" {...address} onChange={this.handleAddressChange} value={this.state.address} />
            {address.touched && address.error && <div className="alert alert-danger">{address.error}</div>}
          </fieldset>

          <fieldset className="form-group">
            <label>Suburb:</label>
            <input className="form-control" {...suburb} onChange={this.handleSuburbChange} value={this.state.suburb} />
            {suburb.touched && suburb.error && <div className="alert alert-danger">{suburb.error}</div>}
          </fieldset>


          <fieldset className="form-group">
            <label>City:</label>
            <input className="form-control" {...city} />
            {city.touched && city.error && <div className="alert alert-danger">{city.error}</div>}
          </fieldset>

          <fieldset className="form-group">
            <label>State:</label>
            <input className="form-control" {...state} value={this.state.state} />
            {state.touched && state.error && <div className="alert alert-danger">{state.error}</div>}
          </fieldset>

          <fieldset className="form-group">
            <label>Post:</label>
            <input className="form-control" {...post} value={this.state.post}/>
            {post.touched && post.error && <div className="alert alert-danger">{post.error}</div>}
          </fieldset>

          <fieldset className="form-group">
            <label>Phone:</label>
            <input className="form-control" {...phone} />
            {phone.touched && phone.error && <div className="alert alert-danger">{phone.error}</div>}
          </fieldset>

          <fieldset className="form-group">
            <label>Cuisine:</label>
            <input className="form-control" {...cuisine} />
            {cuisine.touched && cuisine.error && <div className="alert alert-danger">{cuisine.error}</div>}
          </fieldset>

          {/* <Map 
            lat={this.state.location.lat}
            lng={this.state.location.lng}
            defaultZoom={18}
          /> */}

          <button className="btn btn-warning">Submit</button>
        </div>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  // for (let property in formProps) {
  //   if (formProps.hasOwnProperty(property)) {
  //     console.log(`${property}: ${formProps[property]}`);
  //   }
  // }

  if (!formProps.name) {
    errors.name = 'Restaurant name is required';
  }

  if (!formProps.address) {
    errors.address = 'Address is required';
  }

  if (!formProps.suburb) {
    errors.suburb = 'Suburb is required';
  }

  if (!formProps.city) {
    errors.city = 'City is required';
  }

  if (!formProps.state) {
    errors.state = 'State is required';
  }

  if (!formProps.post) {
    errors.post = 'Post is required';
  }

  if (!formProps.phone) {
    errors.phone = 'Phone is required';
  }

  if (!formProps.cuisine) {
    errors.cuisine = 'Cuisine is required';
  }

  return errors;
}

export default reduxForm({
  form: 'Add Restaurant',
  fields: ['name', 'address', 'suburb', 'city', 'state', 'post', 'phone', 'cuisine'],
  validate
}, null, actions)(AddRestaurant);