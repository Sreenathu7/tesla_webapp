import { BaseService } from './BaseService.js';
import { OrderRepository } from '../repositories/OrderRepository.js';

class OrderService extends BaseService {
    constructor(repository = new OrderRepository()) {
        super(repository);
    }

    async createOrder(orderData) {
        console.log('🔍 OrderService.createOrder called with:', orderData);
        const { userId, carId, configurationJson, totalPrice } = orderData;

        console.log('📝 Extracted fields:', { userId, carId, totalPrice, configurationJson });

        if (!userId || !carId || !totalPrice || !configurationJson) {
            const missing = [];
            if (!userId) missing.push('userId');
            if (!carId) missing.push('carId');
            if (!totalPrice) missing.push('totalPrice');
            if (!configurationJson) missing.push('configurationJson');

            const error = `Missing required fields: ${missing.join(', ')}`;
            console.error('', error);
            throw new Error(error);
        }

        console.log('All required fields present');
        console.log(' Creating order in database...');

        try {
            const order = await this.repository.createOrder({
                userId,
                carId,
                configurationJson,
                totalPrice,
                status: 'PENDING'
            });

            console.log(`Order created: ID=${order.id}, Car=${order.car.name}, User=${order.user.email}, Total=$${order.totalPrice}`);
            return order;
        } catch (dbError) {
            console.error(' Database error:', dbError);
            throw dbError;
        }
    }

    async getUserOrders(userId) {
        const orders = await this.repository.findByUserId(userId);
        console.log(` Found ${orders.length} orders for user ${userId}`);
        return orders;
    }

    async getAllOrders() {
        const orders = await this.repository.findAllOrders();
        console.log(` Found ${orders.length} total orders`);
        return orders;
    }
}

export default new OrderService();
