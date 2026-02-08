import prisma from '../prisma.js';

class OrderService {
    async createOrder(orderData) {
        const { userId, configurationJson, totalPrice } = orderData;
        return await prisma.order.create({
            data: {
                userId,
                configurationJson,
                totalPrice
            }
        });
    }

    async getUserOrders(userId) {
        return await prisma.order.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            include: { car: true, user: true }
        });
    }

    async getAllOrders() {
        return await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { car: true, user: true }
        });
    }
}

export default new OrderService();
