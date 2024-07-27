import {
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controller/userController.js';

import express from 'express';
import { protect } from '../middleWare/authMiddleWare.js';

const router = express.Router();

// Route to handle user registration
router.route('/').post(registerUser); // POST request to '/api/users/' calls the registerUser function

// Protected route to get the user's profile and update it
router.route('/profile').get(protect, getUserProfile)  // Requires authentication
.put(protect, updateUserProfile); // Requires authentication

// Route to get all users (typically should be protected)
router.route('/all').get(protect, getAllUsers); // Requires authentication

// Route to delete a user
router.route('/:id').delete(protect, deleteUser); // Requires authentication

export default router;
