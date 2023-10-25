require("dotenv").config();
const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const catRoutes = require('./routes/categories');
const parser  = require('body-parser');
const mongoose = require("mongoose");
const pw = "nVWhwQPryOLEMEVD";

mongoose.connect('mongodb+srv://admin:' + process.env.MONGOROUTE + '/?retryWrites=true&w=majority').then(
    
);

mongoose.connection.on('open', (ref)=> {
    console.log('Connected to mongo server.');
})

mongoose.connection.once('open', (ref) => {
    console.log('called only once on open event');
});

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

//Header controls//
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST','DELETE');
    next();
});

//Active Routes//
app.use('/blog', blogRoutes);
app.use('/blog/categories', catRoutes);

app.use((req, res, next) => {
    const error = new Error('Route not found.');
    error.status = "404";
    next(error);
});

app.use((error,req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

module.exports = app;