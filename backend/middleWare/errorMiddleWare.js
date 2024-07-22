// Handle 404 errors - Not Found
const notFound = (req, res, next) => {
    // Create an error object with a message indicating the URL was not found
    const error = new Error(`Not found - ${req.originalUrl}`);
    
    // Set the response status to 404 (Not Found) and send the error message in JSON format
    res.status(404).json({
        success: false, // Indicate failure
        message: error.message, // Include the error message
        stack: process.env.NODE_ENV === "production" ? "error" : error.stack, // Conditionally include stack trace based on environment
    });
};

// General error handler
const errorHandler = (err, req, res, next) => {
    // Determine the response status code, default to 500 (Internal Server Error) if not set
    let statusCode = res.statusCode || 500;
    
    // Set the response status code if headers have not already been sent
    if (!res.headersSent) {
        res.status(statusCode);
    }

    // Determine the error message, default to "Server Error" if not provided
    let message = err.message || "Server Error";

    // Send the error response in JSON format
    res.json({
        success: false, // Indicate failure
        message, // Include the error message
        stack: process.env.NODE_ENV === "production" ? "error" : err.stack, // Conditionally include stack trace based on environment
    });
};

export { notFound, errorHandler };
