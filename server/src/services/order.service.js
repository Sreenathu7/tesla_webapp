import prisma from '../prisma.js';

class OrderService {
    async createOrder(orderData) {
        const { userId, configurationJson, totalPrice } = orderData;
        const order = await prisma.order.create({
            data: {
                userId,
                configurationJson,
                totalPrice
            }
        });
        console.log(' created with ID:', order.id);
        return order;
    }

    async getUserOrders(userId) {
        const orders = await prisma.order.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            include: { car: true, user: true }
        });
        console.log(`found ${orders.length} orders for user`);
        return orders;
    }

    async getAllOrders() {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { car: true, user: true }
        });
        console.log(`found ${orders.length} total orders`);
        return orders;
    }
}

export default new OrderService();
