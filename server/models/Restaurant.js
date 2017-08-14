const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  tel: String,
  address: String,
  suburb: String,
  city: String,
  state: String,
  postcode: String,
  cuisines: [String],
  location: Schema.Types.Mixed
});

const modelClass = mongoose.model('restaurant', restaurantSchema);

module.exports = modelClass;
