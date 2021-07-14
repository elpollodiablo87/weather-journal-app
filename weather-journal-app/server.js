projectData = {};

//Setting up express 
const express = require('express');

const app = express();

//Requiring middlware
const bodyParser = require('body-parser')

const fetch = require("node-fetch");


/* Middleware*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3100;
const server = app.listen(port, ()=>{console.log(`server is running at: ${port}`)})

//Setup routes

//The initial get request
app.get('/get', (req, res)=> {
  res.send(projectData);
});

//Post request
app.post('/postData', (req, res)=> {
	projectData.temperature = req.body.temp;
  projectData.date = req.body.date;
  projectData.feelings = req.body.feelings;
  res.end()
})

