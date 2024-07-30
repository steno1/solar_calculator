import { calculateChargeControllerSizing } from '../controller/chargeController.js';
import express from 'express';

const router = express.Router(); // Create a new router instance

// Define the route for calculating charge controller sizing
router.route('/calculate').post(calculateChargeControllerSizing);

export default router; // Export the router
