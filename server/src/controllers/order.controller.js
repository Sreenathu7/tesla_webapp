import orderService from '../services/order.service.js';

export const createOrder = async (req, res) => {
    try {
        console.log('📨 Received order request:', req.body);
        console.log('Request headers:', req.headers);
        const order = await orderService.createOrder(req.body);
        console.log('✅ Order created successfully, ID:', order.id);
        res.status(201).json(order);
    } catch (error) {
        console.error('❌ Error creating order:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {

        const orders = await orderService.getUserOrders(req.params.userId);
        console.log(` Retrieved ${orders.length} orders`);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        console.log(`Retrieved ${orders.length} orders`);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
