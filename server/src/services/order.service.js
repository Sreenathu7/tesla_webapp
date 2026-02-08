import prisma from '../prisma.js';

class OrderService {
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
            console.error('❌', error);
            throw new Error(error);
        }

        console.log('✅ All required fields present');
        console.log('💾 Creating order in database...');

        try {
            const order = await prisma.order.create({
                data: {
                    userId,
                    carId,
                    configurationJson,
                    totalPrice,
                    status: 'PENDING'
                },
                include: {
                    car: true,
                    user: true
                }
            });
            console.log(`✅ Order created: ID=${order.id}, Car=${order.car.name}, User=${order.user.email}, Total=$${order.totalPrice}`);
            return order;
        } catch (dbError) {
            console.error('❌ Database error:', dbError);
            throw dbError;
        }
    }

    async getUserOrders(userId) {
        const orders = await prisma.order.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            include: { car: true, user: true }
        });
        console.log(`📦 Found ${orders.length} orders for user ${userId}`);
        return orders;
    }

    async getAllOrders() {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { car: true, user: true }
        });
        console.log(`📦 Found ${orders.length} total orders`);
        return orders;
    }
}

export default new OrderService();
