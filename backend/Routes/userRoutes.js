import { loginUser, registerUser } from '../controller/userController.js'; // Import controller functions for handling user routes

import express from 'express'; // Import express for creating the router

const router = express.Router(); // Create a new express router instance

// Route to handle user registration
router.route('/').post(registerUser); // POST request to '/api/users/' calls the registerUser function

// Route to handle user login
router.post('/login', loginUser); // POST request to '/api/users/login' calls the loginUser function

export default router; // Export the router to be used in the main application
