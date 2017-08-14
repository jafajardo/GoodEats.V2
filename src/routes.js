import React from 'react';
import { Router, browserHistory } from 'react-router';

import App from './components/app';
import Home from './components/home';

const loadModule = (cb) => {
  return module => cb(null, module.default);
}

const componentRoutes = {
  component: App,
  path: '/',
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'restaurants',
      getComponent(location, cb) {
        System.import('./components/restaurants')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'signin',
      getComponent(location, cb) {
        System.import('./components/auth/signin')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'signup',
      getComponent(location, cb) {
        System.import('./components/auth/signup')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'addRestaurant',
      getComponent(location, cb) {
        System.import('./components/addRestaurant')
          .then(module => cb(null, module.default));
      }
    }
  ]
}

const Routes = () => {
  return (
    <Router history={browserHistory} routes={componentRoutes} />
  );
}

export default Routes;