import { errorHandler, notFound } from './middleWare/errorMiddleWare.js';

import connectDB from './config/db.js'; // Adjust the path if necessary
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'; // Import dotenv
import express from 'express';
import userRoutes from './Routes/userRoutes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Middleware for URL-encoded data

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

//notfound handling middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
