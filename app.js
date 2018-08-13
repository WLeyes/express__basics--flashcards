// import required express library and store in variable  
const express = require('express');

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Cookie parser
const cookieParser = require('cookie-parser');

// CREATE EXPRESS SERVER

// Call express function
const app = express();

// Disable parsers extended option
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Envoke cookieParser
app.use(cookieParser());

// Set templating engine
app.set('view engine', 'pug');


app.use((req, res, next) => {
  req.message = 'This message was passed from middleware 1';
  next();
});

app.use((req, res, next) => {
  console.log(req.message);
  next();
});

// get home route (since using pug, default looks for folder named views)
app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

// get hello route
app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

// post hello route
app.post('/hello', (req, res) => {
  // Set cookie with username from input
  res.cookie('username', req.body.username);
  // Return response to the hello route passing in the name
  res.redirect('/');
});

// post logout route
app.post('/goodbye', (req, res) => {
  // Clear cookie with username from input
  res.clearCookie('username');
  // redirect to hello to log in
  res.redirect('/hello');
});

//  get cards route
app.get('/cards', (req, res) => res.render('card', { prompt: "Who is buried in Grant's tomb?" }));

// set port #
const port = 3000;
// tell express to listen to the port that we set
app.listen(port, () => {
  console.log(`The application is currently running on localhost:${port}`);
});