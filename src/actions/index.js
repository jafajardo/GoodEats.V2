import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
  SEARCH_BY_SUBURB,
  SEARCH_BY_NAME,
  SEARCH_BY_CITY,
  SEARCH_BY_CUISINE,
  CLEAR_SEARCHED_RESTAURANTS,
  SEARCH_RESTAURANTS_NEARBY,
  ADD_RESTAURANT,
  AUTH_USER,
  UNAUTH_USER
} from './types';

import {
  RESTAURANT_ENDPOINT,
  AUTH_ENDPOINT
} from './config';


/////// RESTAURANT ACTIONS ///////

export function searchInSuburb(keyword) {
  return dispatch => {
    axios.get(`${RESTAURANT_ENDPOINT}/getRestaurants`)
      .then(({data}) => {
        const filteredRestaurants = data.filter(res => {
          return res.suburb.toLowerCase() === keyword.toLowerCase();
        });
    
        dispatch({
          type: SEARCH_BY_SUBURB,
          payload: filteredRestaurants
        });
      });
  }
}

export function searchInName(keyword) {
  return dispatch => {
    axios.get(`${RESTAURANT_ENDPOINT}/getRestaurants`)
    .then(({data}) => {
      const filteredRestaurants = data.filter(res => {
        return res.name.toLowerCase().includes(keyword);
      });
      dispatch({
        type: SEARCH_BY_NAME,
        payload: filteredRestaurants
      });
    });
  }
}

export function searchInCity(keyword) {
  return dispatch => {
    axios.get(`${RESTAURANT_ENDPOINT}/getRestaurants`)
    .then(({data}) => {
      const filteredRestaurants = data.filter(res => {
        return res.city.toLowerCase() === keyword.toLowerCase();
      });
  
      dispatch({
        type: SEARCH_BY_CITY,
        payload: filteredRestaurants
      });
    });
  }
}

export function searchInCuisine(keyword) {
  return dispatch => {
    axios.get(`${RESTAURANT_ENDPOINT}/getRestaurants`)
    .then(({data}) => {
      const filteredRestaurants = data.filter(res => {
        return res.cuisines.some(cuisine => {
          return cuisine.toLowerCase() === keyword.toLowerCase();
        })
      });
  
      dispatch({
        type: SEARCH_BY_CUISINE,
        payload: filteredRestaurants
      });
    });
  }
}

export function searchRestaurantsNearby({ latitude, longitude }) {
  return dispatch => {
    const referenceCoord = new google.maps.LatLng(latitude, longitude);
    
    axios.get(`${RESTAURANT_ENDPOINT}/getRestaurants`)
      .then(({data}) => {
        const restaurantsNearby = data.filter(res => {
          const targetLat = Number(res.location.lat);
          const targetLng = Number(res.location.lng);
          const targetCoord = new google.maps.LatLng(targetLat, targetLng);

          return google.maps.geometry.spherical.computeDistanceBetween(
            referenceCoord, targetCoord) <= 2000;
        });

        dispatch({
          type: SEARCH_RESTAURANTS_NEARBY,
          payload: restaurantsNearby
        })
      });
  }
}

export function clearSearchedRestaurants() {
  return dispatch => {
    dispatch({ type: CLEAR_SEARCHED_RESTAURANTS });
  }
}

export function addRestaurant(newRestaurant) {
  console.log('Inside add restaurant: ', newRestaurant);
  return dispatch => {
    axios.post(
      `${RESTAURANT_ENDPOINT}/addRestaurant`, newRestaurant)
        .then(response => {
          dispatch({
            type: ADD_RESTAURANT,
            payload: response.data.restaurant
          })

          browserHistory.push('/');
        })
  }
}

////// AUTHENTICATION ACTIONS //////

export function signup({ name, email, password }) {
  return dispatch => {
    axios.post(`${AUTH_ENDPOINT}/signup`, { name, email, password})
      .then(response => {
        // Store token in LocalStorage
        localStorage.setItem('token', response.data.token);

        // Set authenticated boolean state to True
        dispatch({ type: AUTH_USER });

        // Redirect user to Home page
        browserHistory.push('/');
      });
  }
}

export function signin({ email, password }) {
  return dispatch => {
    axios.post(`${AUTH_ENDPOINT}/signin`, {email, password})
      .then(response => {
        // Save token to LocalStorage.
        localStorage.setItem('token', response.data.token);

        // Set authenticated boolean to True
        dispatch({ type: AUTH_USER });

        // Redirect user to Home page.
        browserHistory.push('/');
      });
  }
}

export function signout() {
  return dispatch => {
    // Remove token from LocalStorage.
    localStorage.removeItem('token');

    // Set authenticated to False.
    dispatch({
      type: UNAUTH_USER
    });

    // Redirect user to Home page.
    browserHistory.push('/');
  }
}