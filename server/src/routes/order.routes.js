import express from 'express';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/user/:userId', orderController.getUserOrders);

export default router;
