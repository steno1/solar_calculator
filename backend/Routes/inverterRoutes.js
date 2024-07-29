import { calculateInverterSizing } from '../controller/inverterController.js'; // Import the calculateInverterSizing function
import express from 'express'; // Import express

const router = express.Router(); // Create a new router

// Route to handle inverter sizing calculations
router.post('/calculate', calculateInverterSizing); // POST request to /calculate endpoint

export default router; // Export the router
