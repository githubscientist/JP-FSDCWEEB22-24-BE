// import express
const express = require('express');

// create an express application
const app = express();

// add a test route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// export the app
module.exports = app;