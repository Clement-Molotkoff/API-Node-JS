/**
 *  Project : API-NODE-JS 
 * 
 *  Date : May 05 2019
 *  Created by Clement Molotkoff 
 */

// FileName: server.js

// Import config file 
const config = require('./config')

// Import express
const express = require('express');

// Import Body parser
const bodyParser = require('body-parser');

// Import Mongoose
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// Import routes
const apiRoutes = require("./App/routes/api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded(
    { extended: true }
    ));

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable    { useNewUrlParser: true }
mongoose.connect(config.server.database);

// Setup server port
var port = config.server.port;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Serveur starting....");
    console.log("Running API server on port " + port);
    console.log("Default uri for API is <ip>/api/");
});
