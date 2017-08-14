import _ from 'lodash';

import { 
  SEARCH_BY_SUBURB,
  SEARCH_BY_NAME,
  SEARCH_BY_CITY,
  SEARCH_BY_CUISINE,
  CLEAR_SEARCHED_RESTAURANTS,
  SEARCH_RESTAURANTS_NEARBY,
  ADD_RESTAURANT
} from '../actions/types.js';

const INITIAL_STATE = {
  searched_restaurants: [],
  nearby_restaurants: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_BY_SUBURB:
    case SEARCH_BY_NAME:
    case SEARCH_BY_CITY:
    case SEARCH_BY_CUISINE: {
      return { ...state, searched_restaurants: _.uniqBy([...state.searched_restaurants, ...action.payload], '_id') }
    }
    case SEARCH_RESTAURANTS_NEARBY: {
      return { ...state, nearby_restaurants: action.payload }
    }
    case ADD_RESTAURANT: {
      return { ...state, searched_restaurants: [...state.searched_restaurants, ...action.payload] }
    }
    case CLEAR_SEARCHED_RESTAURANTS: {
      return { ...state, searched_restaurants: [] }
    }
  }
  return state;
}