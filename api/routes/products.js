const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
   Product.find()
   .exec()
   .then(docs => {
        console.log("Documets ===>>", docs)
        res.status(200).json(docs)
   })
   .catch(error => {
        console.log("Error =====>>>>", error)
        res.status(500).json({
            error: error
        })
   })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result =>{
        console.log("Result ===>",result);
        res.status(200).json({
            message: "POST method with /product",
            productCreated: result,
        });
    })
    .catch(error => console.log("Error =====>>", error))
    
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("====== From the database, ", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No valid entry found for this ID'
            })
        }
    })
    .catch(error => {
        console.log("Error=====>>>>", error);
        res.status(500).json({ error: error})
    })
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'you updated a product',
    })
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'You have deleted a product !!!',
    })
});

module.exports = router;