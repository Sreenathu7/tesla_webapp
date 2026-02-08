const prisma = require('../prisma');

class CarService {
    async getAllCars(query) {
        const { search, sortBy, order = 'asc', page = 1, limit = 10, category, drive_train } = query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

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

        if (drive_train) {
            where.drive_train = drive_train;
        }

        const { minPrice, maxPrice } = query;
        if (minPrice || maxPrice) {
            where.base_price = {};
            if (minPrice) where.base_price.gte = parseFloat(minPrice);
            if (maxPrice) where.base_price.lte = parseFloat(maxPrice);
        }

        const orderBy = sortBy ? { [sortBy]: order } : { createdAt: 'desc' };

        const cars = await prisma.car.findMany({
            where,
            orderBy,
            include: { variants: true, colors: true },
            skip,
            take: parseInt(limit)
        });

        const total = await prisma.car.count({ where });

        return {
            cars,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async getCarBySlug(slug) {
        const car = await prisma.car.findUnique({
            where: { slug },
            include: { variants: true, colors: true }
        });
        return car;
    }
}

module.exports = new CarService();
