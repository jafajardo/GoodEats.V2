const Restaurant = require('../models/Restaurant');
const MongoClient = require('mongodb').MongoClient;
const connection = 'mongodb://localhost:27017/GoodEats';
const collection = 'Restaurants';

exports.getRestaurants = function(req, res) {
  // Query database.
  // Restaurant.find((err, restaurants) => {
  //   // Send the data back in res.
  //   if (err) {
  //     req.next(err);
  //   }

  //   res.send({ data: restaurants });
  // });

  MongoClient.connect(connection, (err, database) => {
    if (err) {
      res.status(500).send({ error: 'Error connecting to data source' });
    }

    database.collection(collection).find().toArray((err, restaurants) => {
      if (err) {
        res.status(500).send({ error: 'Could not find collection' });
      }

      res.json(restaurants);
    });
  });
}

exports.addRestaurant = function(req, res, next) {
  console.log(req.body);
  const name = req.body.name;
  const address = req.body.address;
  const suburb = req.body.suburb;
  const city = req.body.city;
  const state = req.body.state;
  const post = req.body.post;
  const phone = req.body.phone;
  const cuisine = req.body.cuisine;
  const cuisines = new Array(cuisine);
  const location = req.body.location;

  MongoClient.connect(connection, (err, database) => {
    if (err) { next(err); }

    database.collection(collection).insertOne({
      name: name,
      address: address,
      suburb: suburb,
      city: city,
      state: state,
      post: post,
      phone: phone,
      cuisines: cuisines,
      location: location
    }, (err, result) => {
      res.json({ message: 'Success', restaurant: result });
    })
  })

  // Restaurant.findOne({ name: name }, function(err, existingResto) {
  //   console.log('error: on find resto ', err);
  //   if (err) { return next(err); }

  //   if (existingResto) {
  //     return res.status(422).send({ error: 'Restaurant already exists' });
  //   }

  //   const newResto = new Restaurant({
  //     name: name,
  //     address: address,
  //     suburb: suburb,
  //     city: city,
  //     state: state,
  //     post: post,
  //     phone: phone,
  //     cuisines: cuisines,
  //     location: location
  //   });

  //   newResto.save(function(err) {
  //     console.log('Error on save: ', err)
  //     if (err) { return next(err); }

  //     // Restaurant.findOne({ name: name, suburb: suburb, city: city }, function(err, savedResto) {
  //     //   if (err) { return next(err); }
  //     // });

  //     res.json({ 
  //       message: 'Success'
  //     });
  //   })
  // })
}