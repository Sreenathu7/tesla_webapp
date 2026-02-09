import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';

export class CarRepository extends BaseRepository {
    constructor() {
        super(prisma.car);
    }

    async findBySlug(slug) {
        return await this.model.findUnique({
            where: { slug },
            include: {
                colors: true,
                variants: true
            }
        });
    }

    async findWithFilters({ search, category, minPrice, maxPrice, sortBy, order, skip, take }) {
        const where = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (category) {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.base_price = {};
            if (minPrice) where.base_price.gte = parseFloat(minPrice);
            if (maxPrice) where.base_price.lte = parseFloat(maxPrice);
        }

        const orderBy = sortBy ? { [sortBy]: order } : { createdAt: 'desc' };

        console.log('  cars from database with filters:', where);

        const [cars, total] = await Promise.all([
            this.model.findMany({
                where,
                include: {
                    colors: true,
                    variants: true
                },
                orderBy,
                skip,
                take
            }),
            this.count(where)
        ]);

        console.log(`found ${total} cars, returning ${cars.length}`);

        return { cars, total };
    }
}
