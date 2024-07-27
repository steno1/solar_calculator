// src/routes/authRoutes.js

import { loginUser, logoutUser } from '../controller/userController.js';

import express from 'express';

const router = express.Router(); // Create a new express router instance

// Route to handle user login
router.post('/login', loginUser); 

// Route to handle user logout
router.post('/logout', logoutUser);

export default router;
