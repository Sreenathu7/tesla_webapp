import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';

export class OrderRepository extends BaseRepository {
    constructor() {
        super(prisma.order);
    }

    async createOrder(orderData) {
        return await this.model.create({
            data: orderData,
            include: {
                car: true,
                user: true
            }
        });
    }

    async findByUserId(userId) {
        return await this.model.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            include: {
                car: true,
                user: true
            }
        });
    }

    async findAllOrders() {
        return await this.model.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                car: true,
                user: true
            }
        });
    }
}
