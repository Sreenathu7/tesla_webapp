import carService from '../services/car.service.js';

export const getAllCars = async (req, res) => {
    try {
        const result = await carService.getAllCars(req.query);
        console.log(` Retrieved ${result.cars.length} cars`);
        res.json(result);
    } catch (error) {
        console.error(' Get cars error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getCarBySlug = async (req, res) => {
    try {
        console.log('→ Get car by slug:', req.params.slug);
        const car = await carService.getCarBySlug(req.params.slug);
        if (!car) {
            console.log(' Car not found:', req.params.slug);
            return res.status(404).json({ error: 'Car not found' });
        }
   
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
