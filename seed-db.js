var data = require('./MOCK_DATA.json');
var mongoose = require('mongoose');
var simExp = require('./db/model.js');
var fs = require('fs');
var request = require('request');

mongoose.connect('mongodb://localhost/experiences');


var seedDb = function() {
  simExp.insert(data, function(err) {
    if (err) {
      throw err;
    }
    console.log('Inserted MockData!', data);
    mongoose.connection.close();
  });
};


var getArrayOfAllPictureLinks = function() {
    simExp.SimExperience.find()
    .distinct('experience_photo_url', function(err, photos) {
      photos.forEach(function(str) {
        var filename =  str.split('.png').join('').split('/').join('').substring(str.length-21);
        console.log('Downloading ' + filename);
        download(str, __dirname + `/pictures/${filename}.png`, function(){console.log('Finished Downloading' + filename)});
    });
  });
};

var download = function(url, dest, callback){
    request.get(url)
    .on('error', function(err) {console.log(err)} )
    .pipe(fs.createWriteStream(dest))
    .on('close', callback);

};

// urlList.forEach( function(str) {
//   var filename =  str.split('/').pop();
//   console.log('Downloading ' + filename);
//   download(str, filename, function(){console.log('Finished Downloading' + filename)});
// });

// download('http://dummyimage.com/235x158.png/dddddd/000000', './pictures/google.png', function(){
//   console.log('done');
// });
getArrayOfAllPictureLinks();
//seedDb();

