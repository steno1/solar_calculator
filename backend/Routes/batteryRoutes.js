import { calculateBatterySizing } from '../controller/batteryController.js';
import express from 'express';

const router = express.Router(); // Create a new router instance


// Define the route for calculating battery sizing
router.route('/calculate').post(calculateBatterySizing);

export default router; // Export the router
