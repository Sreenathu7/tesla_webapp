import orderService from '../services/order.service.js';

export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await orderService.getUserOrders(req.params.userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
