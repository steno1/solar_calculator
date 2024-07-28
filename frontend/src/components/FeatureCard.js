import { Button, Card } from 'react-bootstrap'; // Import Button and Card components from react-bootstrap

import Loader from './Loader'; // Import the Loader component
import Message from './Message'; // Import the Message component
import React from 'react'; // Import React

/**
 * FeatureCard Component
 * 
 * This component displays a card with a title, an icon, and a button.
 * It also handles loading and error states by displaying a loader or an error message if necessary.
 * 
 * @param {Object} props - The properties passed to the component
 * @param {string} props.title - The title of the card
 * @param {JSX.Element} props.icon - The icon to be displayed inside the button
 * @param {function} props.onClick - The function to be called when the button is clicked
 * @param {boolean} props.isLoading - The loading state to determine if the loader should be displayed
 * @param {boolean} props.isError - The error state to determine if the error message should be displayed
 * @param {Object} props.error - The error object containing the error message
 */
const FeatureCard = ({ title, icon, onClick, isLoading, isError, error }) => ( // Define the FeatureCard component with props
  <Card className="card-style card-dark"> {/* Card container with custom styles */}
    <Card.Body> {/* Card body containing the main content */}
      <Card.Title className="text-center">{title}</Card.Title> {/* Card title displayed at the center */}
      <Button variant="primary" className="button-style" onClick={onClick}> {/* Button with custom styles and click handler */}
        {icon} {title} {/* Display icon and title inside the button */}
      </Button>
      {isLoading && <Loader />} {/* Conditionally render Loader component if isLoading is true */}
      {isError && <Message variant="danger">{error.message}</Message>} {/* Conditionally render error message if isError is true */}
    </Card.Body>
  </Card>
);

export default FeatureCard; // Export the FeatureCard component
