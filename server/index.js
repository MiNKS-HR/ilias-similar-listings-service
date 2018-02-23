const express = require('express');
var mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3003;
var simExp = require('../db/model.js');

mongoose.connect('mongodb://localhost/experiences');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/../public')));

app.get('/experience/similar/:id', function(req, res) {
  let id = req.params.id;
  simExp.findOne(id, function(exp) {
    console.log(exp);
    res.status(200).send(exp);
  })
});

app.get('/experience/similar/location/:location', function(req, res) {
  let loc = req.params.location;
  console.log(loc);
  simExp.findLocation(loc, function(exp) {
    console.log(exp);
    res.status(200).send(exp);
  })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});