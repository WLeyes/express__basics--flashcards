// import required express library and store in variable  
const express = require('express');

// Create express server

// Call express function
const app = express();

// Set templating engine
app.set('view engine', 'pug');

// get home route (since using pug, default looks for folder named views)
app.get('/', (req, res) => res.render('index'));

// get hello route
app.get('/hello', (req, res) => res.render('hello'));

// post hello route
app.post('/hello', (req, res) => res.render('hello'));


//  get cards route
app.get('/cards', (req, res) => res.render('card', { prompt: "Who is buried in Grant's tomb?" }));

// set port #
const port = 3000;
// tell express to listen to the port that we set
app.listen(port, () => {
  console.log(`The application is currently running on localhost:${port}`);
});