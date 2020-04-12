const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders are fetched'
    })
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Order details fetch',
        id: req.params.orderID,
    })
})
router.post('/', (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity,
    }

    res.status(201).json({
        message: 'Order was created',
        order: order,
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order was deleted',
        id: req.params.orderId
    })
});

router.patch('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Order was updated',
        id: req.params.orderID
    })
});

module.exports = router;