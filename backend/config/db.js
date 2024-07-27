import mongoose from 'mongoose'; // Import mongoose for MongoDB connection

// Function to connect to MongoDB using mongoose
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds if no server is available
    });

    // Log a success message including the host of the MongoDB instance
    console.log(`MongoDB connected: ${conn.connection.host} connected now`);
  } catch (error) {
    // Log an error message if the connection fails
    console.error(`Error: ${error.message}`);

    // Exit the process with a failure code (1) if the connection could not be established
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
export default connectDB;
