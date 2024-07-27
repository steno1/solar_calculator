import LoadRoutes from './Routes/LoadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js'; // Ensure this path is correct
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Mount the authentication routes
app.use('/api/auth', authRoutes);

// Mount the user management routes
app.use('/api/users', userRoutes);
app.use('/api/loads', LoadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
