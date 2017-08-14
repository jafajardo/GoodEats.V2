const RestaurantsController = require('./controllers/RestaurantsController');

module.exports = function(app) {
  app.get('/getRestaurants', (req, res) => {
    RestaurantsController.getRestaurants(req, res);
  });

  app.post('/addRestaurant', RestaurantsController.addRestaurant);
}