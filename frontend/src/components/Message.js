import { Alert } from 'react-bootstrap'; // Import the Alert component from React Bootstrap

const Message = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
};

export default Message; // Export the Message component as the default export
