require("babel-register");
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const SimilarExperience = require('../client/components/SimilarExperience.jsx');
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
//app.use(bodyParser.urlencoded({ extended: false }))


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/../public')));

app.get('/experience/similar/:id', function(req, res) {
  let id = req.params.id;
  console.log('URURURUURRL', req.url)
  simExp.findOne(id, function(exp) {
    //console.log(exp);
  res.status(200).send(exp);
  })
});

app.get('/experience/similar/location/:location', function(req, res) {
  let loc = req.params.location;
  console.log(loc);
  // simExp.findLocation(loc, function(exp) {
  //   //console.log(exp);
  //   res.status(200).send(exp);
  // })
  simExp.find16Random(function(exp) {
    //console.log('SERVER', exp);
    res.status(200).send(exp);
  })
});

app.get('/id/:id', function(req, res) {
  let id = req.params.id;
  //res.status(200).send('SUSS');
  //res.redirect(`/`);
  //const innerContent = ReactDOMServer.renderToString(comp);
  //res.send(`<!DOCTYPE html>${innerContent}`);
  //res.sendFile(path.join(__dirname + '/../public/index.html'))
  const rApp = React.createFactory(SimilarExperience)({});

  // write out the component to HTML string
  const reactHtml = ReactDOMServer.renderToString(rApp);

  // create final HTML to ship using string templating
  // by injecting the react HTML into this string
  const html = `
    <!DOCTYPE html>
    <html>
     <head>
     <title>JSON Formatter</title>
     </head>
     <body>
     <div id="app">${reactHtml}</div>
     <script src="/static/js/react-app.js"></script>
     </body>
    </html>
  `;

  // send to the browser
  res.send(html);
});

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// app.get('*', (req, res) => {
//     const innerContent = ReactDOMServer.renderToString(<SimilarExperience pathname={req.url} />);

//     const html = ReactDOMServer.renderToStaticMarkup(<Html innerContent={innerContent} />);

//     res.send(`<!DOCTYPE html>${html}`);
// });

module.exports = app