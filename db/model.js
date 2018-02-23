var mongoose = require('mongoose');

var similarExperience = mongoose.Schema({
  id: {type: Number, unique: true},
  experience_category: String,
  experience_location: String,
  experience_title: String,
  experience_rating_average: Number,
  experience_price: Number,
  experience_rating_count: Number,
  experience_photo_url: String
});

var SimExperience = mongoose.model('Experience', similarExperience);

function findAll(callback) {
  SimExperience.find().then((result)=>callback(result));
}

function findOne(id, callback) {
  SimExperience.find({id: id}).then((result) => callback(result));
}

function findLocation(loc, callback) {
  SimExperience.find({experience_location: loc}).limit(16).then((result) => callback(result));
}

function insert(experiences, callback) {
  SimExperience.create(experiences, callback);
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.insert = insert;
exports.findLocation = findLocation;
exports.SimExperience = SimExperience;
