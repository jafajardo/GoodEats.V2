import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import restaurantReducer from './reducers_restaurants';
import userReducer from './reducers_user';

export default combineReducers({
  form: formReducer,
  restaurants: restaurantReducer,
  user: userReducer
});