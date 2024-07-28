import { calculateInverterSizing } from '../controller/inverterController.js';
import express from 'express';

const router = express.Router();

// Route to handle inverter sizing calculations
router.post('/calculate', calculateInverterSizing);

export default router;
