import { errorHandler, notFound } from './middleWare/errorMiddleWare.js'; // Import error handling middleware

import LoadRoutes from './Routes/LoadRoutes.js'; // Import Load routes
import authRoutes from './Routes/authRoutes.js'; // Import authentication routes
import batteryRoutes from './Routes/batteryRoutes.js'; // Import battery routes
import chargeControllerRoutes from './Routes/chargeControl.js'; // Import charge controller routes
import connectDB from './config/db.js'; // Import database connection function
import cookieParser from 'cookie-parser'; // Import cookie-parser middleware
import dotenv from 'dotenv'; // Import dotenv for environment variables
import express from 'express'; // Import express
import { fileURLToPath } from 'url'; // Import fileURLToPath from url module
import inverterRoutes from './Routes/inverterRoutes.js'; // Import Inverter routes
import panelRoutes from './Routes/panelRoutes.js'; // Import Panel routes
import path from 'path'; // Import path module
import userRoutes from './Routes/userRoutes.js'; // Import User routes

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB

const app = express(); // Create an express application

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html")));
}

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

// Mount the routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/loads', LoadRoutes); // Load analysis routes
app.use('/api/inverter', inverterRoutes); // Inverter sizing routes
app.use('/api/panel', panelRoutes); // Panel sizing routes
app.use('/api/battery', batteryRoutes); // Battery routes
app.use('/api/charge-controller', chargeControllerRoutes); // Charge controller routes
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Handle other errors

const PORT = process.env.PORT || 5000; // Set the port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Start the server
});
