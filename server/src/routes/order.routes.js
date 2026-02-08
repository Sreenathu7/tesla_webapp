const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;
