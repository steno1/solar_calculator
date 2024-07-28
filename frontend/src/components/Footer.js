import '../Footer.css'; // Import custom styles for the Footer component
import '../footerFix.css'; // Import additional custom CSS for footer fixes

import { Col, Container, Row } from 'react-bootstrap'; // Import Bootstrap components for layout

import React from 'react'; // Import React

// Define the Footer functional component
const Footer = () => {
  return (
    // Use a footer HTML element with the class "footer-container" for styling
    <footer className="footer-container">
      {/* Use Container component from react-bootstrap to wrap the content */}
      <Container>
        {/* Use Row component to create a horizontal layout */}
        <Row>
          {/* Use Col component to center the content horizontally */}
          <Col className="text-center">
            {/* Display the application name and the current year */}
            <p>Princeley Solar Calculator &copy; {new Date().getFullYear()}</p>
            {/* Display the contact email */}
            <p>onuprinceley@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; // Export the Footer component
