// import express
const express = require('express');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

// create an express application
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to parse cookies
app.use(cookieParser());

// define the routes -- routers
app.use('/api/v1/auth', authRouter);

// export the app
module.exports = app;