// import required express library and store in variable  
const express = require('express');

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// CREATE EXPRESS SERVER

// Call express function
const app = express();

// Disable parsers extended option
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Set templating engine
app.set('view engine', 'pug');

// get home route (since using pug, default looks for folder named views)
app.get('/', (req, res) => res.render('index'));

// get hello route
app.get('/hello', (req, res) => res.render('hello'));

// post hello route
app.post('/hello', (req, res) => {
  res.render('hello', { name: req.body.username });
});

//  get cards route
app.get('/cards', (req, res) => res.render('card', { prompt: "Who is buried in Grant's tomb?" }));

// set port #
const port = 3000;
// tell express to listen to the port that we set
app.listen(port, () => {
  console.log(`The application is currently running on localhost:${port}`);
});