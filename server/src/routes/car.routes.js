const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.get('/', carController.getAllCars);
router.get('/:slug', carController.getCarBySlug);

module.exports = router;
