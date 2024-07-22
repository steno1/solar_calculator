import bcrypt from 'bcryptjs'; // Import bcrypt for hashing passwords
import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value is false (not an admin)
  },
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt to compare the entered password with the hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) {
    next(); // Skip hashing if password hasn't been changed
  }
  
  // Generate salt for hashing the password
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
  
  // Continue with the save operation
  next();
});

// Create and export the User model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
