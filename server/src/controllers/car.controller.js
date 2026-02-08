import carService from '../services/car.service.js';

export const getAllCars = async (req, res) => {
    try {
        const result = await carService.getAllCars(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCarBySlug = async (req, res) => {
    try {
        const car = await carService.getCarBySlug(req.params.slug);
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
