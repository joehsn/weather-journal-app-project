/* ******************************************** Localhost:8080 ************************************************ */ 

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData)
});

//Post request
app.post('/addData', (req, res) => {
  projectData = {
      temp: req.body.temp,
      date: req.body.date,
      feelings: req.body.feelings
  };
  console.log(projectData);
  res.send(projectData)
});
/* ******************************************** Localhost:8080 ************************************************ */ 