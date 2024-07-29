import { calculatePanelSizing } from '../controller/panelController.js';
import express from 'express';

const router = express.Router();

// Route to handle panel sizing calculations
router.post('/calculate', calculatePanelSizing);

export default router;
