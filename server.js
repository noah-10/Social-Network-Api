// enable routes
const express = require('express');

//Connection to database
const db = require('./config/connection');

//Connect to folder with all routes
const routes = require('./routes');

// connection endpoint
const PORT = process.env.PORT || 3001;

// Creates new instance of an express application
const app = express();

// Middleware parsing complex objects and arrays from urlencoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON
app.use(express.json());

//Enables express to use the routes in the routes folder
app.use(routes);

// Starts the server only after there is a connection to the database
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});