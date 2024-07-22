import User from '../models/userModel.js'; // Import the User model to interact with user data
import asyncHandler from 'express-async-handler'; // Import asyncHandler to handle asynchronous middleware
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token verification

// Middleware to protect routes and ensure the user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  // Retrieve token from cookies
  let token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token and attach user information to the request object
      req.user = await User.findById(decoded.userId).select('-password');
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      // Log the error and send a 401 response if token verification fails
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized, Token failed');
    }
  } else {
    // Send a 401 response if no token is found
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

// Middleware to check if the user is an admin
const admin = asyncHandler(async (req, res, next) => {
  // Check if the user is authenticated and has admin privileges
  if (req.user && req.user.isAdmin) {
    next(); // Proceed to the next middleware or route handler
  } else {
    // Send a 401 response if the user is not an admin
    res.status(401);
    throw new Error('Not Authorized as an Admin');
  }
});

export { admin, protect };
