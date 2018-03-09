var data = require('./MOCK_DATA.json');
var mongoose = require('mongoose');
var simExp = require('./db/model.js');
var fs = require('fs');
var request = require('request');

mongoose.connect('mongodb://database/experiences');


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
        download(str, __dirname + `/client/pictures/${filename}.png`, function(){console.log('Finished Downloading' + filename)});
    });
  });
};

var download = function(url, dest, callback){
    request.get(url)
    .on('error', function(err) {console.log(err)} )
    .pipe(fs.createWriteStream(dest))
    .on('close', callback);

};

var downloadRealPhotos = function () {
  let url = 'http://lorempixel.com/237/158';
  let filename = 0;
  for (let i = 0; i < 10; i++) {
    download(url, __dirname + `/client/pictures/${filename}.png`, function(){console.log('Finished Downloading' + filename)});
    filename+=1;
  }
}


// download('http://dummyimage.com/235x158.png/dddddd/000000', './pictures/google.png', function(){
//   console.log('done');
// });
//For downloading some real random photos but some are hosted on clouderly
//downloadRealPhotos();

//Gets all the photos listed in the database/MockList
//getArrayOfAllPictureLinks();

seedDb();

