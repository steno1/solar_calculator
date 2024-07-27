import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log('JWT Token:', token); // Log the token

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Log decoded token info

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(404).json({ message: 'User not found' });
        return; // Ensure that the function exits after sending the response
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error); // Log verification error
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

export { protect };
