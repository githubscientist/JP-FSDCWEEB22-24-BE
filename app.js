// import express
const express = require('express');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
const errorRoute = require('./utils/errorRoute');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const cors = require('cors');

// create an express application
const app = express();

// enable CORS for all routes
app.use(cors({
    origin: 'https://jp-fsdcweeb22-24-fe.netlify.app/',
    credentials: true,
}));

// enable serving static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to parse cookies
app.use(cookieParser());

// add the logger middleware
app.use(logger);

// define the routes -- routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);

// handle undefined routes
app.use(errorRoute);

// export the app
module.exports = app;