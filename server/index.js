const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//const port = process.env.PORT || 3003;
const simExp = require('../db/model.js');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

mongoose.connect('mongodb://localhost/experiences');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.use(morgan('dev'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../public/index.html')));
app.use('/similar/content', express.static(path.join(__dirname + '/../public')));

app.get('/id/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/similar/id/:id', function(req, res) {
  let id = req.params.id;
  console.log('URL', req.url)
  simExp.findOne(id, function(exp) {
  //console.log(exp);
  res.status(200).send(exp);
  })
});

app.get('/similar/location/:location', function(req, res) {
  let loc = req.params.location;
  console.log(loc);
  // simExp.findLocation(loc, function(exp) {
  //   //console.log(exp);
  //   res.status(200).send(exp);
  // })
  simExp.find16Random(function(exp) {
    res.status(200).send(exp);
  })
});

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

module.exports = app