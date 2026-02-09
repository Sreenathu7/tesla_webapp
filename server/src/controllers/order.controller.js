import { BaseController } from './BaseController.js';
import orderService from '../services/order.service.js';

class OrderController extends BaseController {
    constructor(service = orderService) {
        super(service);
    }

    createOrder = this.asyncHandler(async (req, res) => {
        console.log('Request headers:', req.headers);
        const order = await this.service.createOrder(req.body);
        this.handleSuccess(res, order, 201);
    });

    getUserOrders = this.asyncHandler(async (req, res) => {
        const orders = await this.service.getUserOrders(req.params.userId);
        this.handleSuccess(res, orders);
    });

    getAllOrders = this.asyncHandler(async (req, res) => {
        const orders = await this.service.getAllOrders();
        console.log(`Retrieved ${orders.length} orders`);
        this.handleSuccess(res, orders);
    });
}

export default new OrderController();
