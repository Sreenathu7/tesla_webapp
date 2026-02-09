import { BaseService } from './BaseService.js';
import { CarRepository } from '../repositories/CarRepository.js';

class CarService extends BaseService {
    constructor(repository = new CarRepository()) {
        super(repository);
    }

    async getAllCars(query) {
        const {
            search = '',
            sortBy = 'base_price',
            order = 'asc',
            page = 1,
            limit = 10,
            category = '',
            minPrice = '',
            maxPrice = ''
        } = query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const { cars, total } = await this.repository.findWithFilters({
            search,
            category,
            minPrice,
            maxPrice,
            sortBy,
            order,
            skip,
            take
        });

        return {
            cars,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        };
    }

    async getCarBySlug(slug) {
        console.log('fetching car by slug:', slug);
        const car = await this.repository.findBySlug(slug);

        if (car) {
            console.log(' Car found:', car.name);
        } else {
            console.log(' Car not found for slug:', slug);
        }

        return car;
    }
}

export default new CarService();
