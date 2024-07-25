import { calculateLoadAnalysis } from '../controller/loadController.js';
import express from 'express';

const router = express.Router();

// Route to handle load analysis calculations
router.post('/calculate', calculateLoadAnalysis);

export default router;
