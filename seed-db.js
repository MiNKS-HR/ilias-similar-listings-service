var data = require('./MOCK_DATA.json');
var mongoose = require('mongoose');
var simExp = require('./db/model.js');

mongoose.connect('mongodb://localhost/experiences');


var seedDb = function() {
  simExp.insert(data, function(err) {
    if (err) {
      throw err;
    }
    console.log('Inserted MockData!', data);
  });
};

seedDb();