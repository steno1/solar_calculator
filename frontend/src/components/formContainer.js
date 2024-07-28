import { Container } from 'react-bootstrap'; // Import the Container component from react-bootstrap
import React from 'react'; // Import React

/**
 * FormContainer Component
 * 
 * This component serves as a wrapper for form elements, providing a consistent layout and styling.
 * 
 * @param {Object} props - The properties passed to the component
 * @param {JSX.Element} props.children - The child components to be wrapped by the container
 */
const FormContainer = ({ children }) => { // Define the FormContainer functional component with destructured props
  return (
    <Container> {/* Use Container component from react-bootstrap to provide responsive layout */}
      <div className="form-container"> {/* Use a div with the class "form-container" for custom styling */}
        {children} {/* Render child components passed to FormContainer */}
      </div>
    </Container>
  );
};

export default FormContainer; // Export the FormContainer component
