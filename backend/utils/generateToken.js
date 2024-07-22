import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating JSON Web Tokens

// Function to generate a JWT for a given user ID
const generateToken = (id) => {
  return jwt.sign(
    { id }, // Payload: The ID of the user to be encoded in the token
    process.env.JWT_SECRET, // Secret key used to sign the token, stored in environment variables
    {
      expiresIn: '30d', // Token expiration time set to 30 days
    }
  );
};

export default generateToken; // Export the generateToken function for use in other parts of the application
