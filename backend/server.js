import { errorHandler, notFound } from './middleWare/errorMiddleWare.js';

import LoadRoutes from './Routes/LoadRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import connectDB from './config/db.js'; // Ensure this path is correct
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import inverterRoutes from './Routes/inverterRoutes.js'; // Import the inverter routes
import mongoose from 'mongoose';
import userRoutes from './Routes/userRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Mount the authentication routes
app.use('/api/auth', authRoutes);

// Mount the user management routes
app.use('/api/users', userRoutes);

// Mount the load analysis routes
app.use('/api/loads', LoadRoutes);

// Mount the inverter sizing routes
app.use('/api/inverter', inverterRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
