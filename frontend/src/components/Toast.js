import React from 'react'; // Import React library
import { Toast } from 'react-bootstrap'; // Import Toast component from react-bootstrap

// ToastMessage component definition
const ToastMessage = ({ show, onClose, message, variant = 'info' }) => {
  return (
    <Toast 
      show={show} // Determines whether the toast is visible
      onClose={onClose} // Function to call when the toast is closed
      delay={5000} // Time in milliseconds to wait before auto-hiding the toast
      autohide // Enables auto-hide feature
      style={{ 
        position: 'absolute', // Position the toast absolutely within its closest positioned parent
        bottom: 20, // Position 20 pixels from the bottom of the parent
        left: '50%', // Center horizontally by setting left to 50%
        transform: 'translateX(-50%)', // Adjust position to exactly center it horizontally
        backgroundColor: 'black', // Set the background color of the toast to black
        color: 'white' // Set the text color of the toast to white
      }}
    >
      <Toast.Body>{message}</Toast.Body> 
    </Toast>
  );
};

export default ToastMessage; // Export the ToastMessage component as the default export
