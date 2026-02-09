import { BaseController } from './BaseController.js';
import carService from '../services/car.service.js';

class CarController extends BaseController {
    constructor(service = carService) {
        super(service);
    }

    getAllCars = this.asyncHandler(async (req, res) => {
        const result = await this.service.getAllCars(req.query);
        console.log(` retrieved ${result.cars.length} cars`);
        this.handleSuccess(res, result);
    });

    getCarBySlug = this.asyncHandler(async (req, res) => {


        const car = await this.service.getCarBySlug(req.params.slug);

        if (!car) {

            return this.handleError(res, new Error('Car not found'), 404);
        }

        this.handleSuccess(res, car);
    });
}

export default new CarController();
