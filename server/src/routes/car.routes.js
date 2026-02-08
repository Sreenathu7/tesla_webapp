import express from 'express';
import * as carController from '../controllers/car.controller.js';

const router = express.Router();

router.get('/', carController.getAllCars);
router.get('/:slug', carController.getCarBySlug);

export default router;
