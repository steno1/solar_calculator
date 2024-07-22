import User from './model/userModel.js'; // Import the User model for database operations
import colors from 'colors'; // Import the colors package to add color to console messages
import connectDB from './config/db.js'; // Import the database connection function
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import mongoose from 'mongoose'; // Import mongoose for interacting with MongoDB

dotenv.config(); // Load environment variables from .env file

// Function to import sample data into the database
const importData = async () => {
  try {
    await connectDB(); // Connect to the MongoDB database

    // Sample users to be added to the database
    const users = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123', // This password will be hashed before saving
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123', // This password will be hashed before saving
      },
    ];

    // Clear existing users from the database
    await User.deleteMany();

    // Insert the sample users into the database
    await User.insertMany(users);

    console.log(colors.green('Users imported successfully')); // Log success message in green
    process.exit(); // Exit the process
  } catch (error) {
    console.error(colors.red(`Error: ${error.message}`)); // Log error message in red
    process.exit(1); // Exit the process with error code
  }
};

// Function to delete all data from the database
const destroyData = async () => {
  try {
    await connectDB(); // Connect to the MongoDB database

    // Delete all users from the database
    await User.deleteMany();

    console.log(colors.yellow('Users deleted successfully')); // Log success message in yellow
    process.exit(); // Exit the process
  } catch (error) {
    console.error(colors.red(`Error: ${error.message}`)); // Log error message in red
    process.exit(1); // Exit the process with error code
  }
};

// Determine whether to import or destroy data based on command-line arguments
if (process.argv[2] === '-d') {
  destroyData(); // Call destroyData function if '-d' argument is provided
} else {
  importData(); // Call importData function otherwise
}
