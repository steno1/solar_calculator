import { Alert } from "react-bootstrap"; // Import the Alert component from React Bootstrap

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}> 
      {children} 
    </Alert>
  );
}

// Set default props for the Message component
Message.defaultProps = {
  variant: "info" // Default variant for the alert is set to "info"
}

export default Message; // Export the Message component as the default export
