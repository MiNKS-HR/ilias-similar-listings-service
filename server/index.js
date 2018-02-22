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

app.post('/experience/similar', function(req, res) {
  let id = req.body.params.ID;
  simExp.findOne(id, function(exp) {
    //console.log(exp);
    res.status(200).send(exp);
  })
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});