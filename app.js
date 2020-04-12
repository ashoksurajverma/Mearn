const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

const app = express();
mongoose.connect('mongodb+srv://suraj:test123@cluster0-kbste.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(morgan('dev'))
// Add body parser to parse the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "Origin, X-Request-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
        return res.status(200).json({});
    }
    next()
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use((req, res, next) => {
    console.log("==============>ssss>>>")
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log("=============>>>>")
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;