const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const light = require('.Desktop/en-ljus-ide-g2/API/routes/light');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
}
next();
});
//Routes which should handle requests

app.use('/light', light);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json ({
        error: {
            message: error.message
        }
    });

});

module.exports = app;