import { Alert } from 'react-bootstrap'; // Import the Alert component from React Bootstrap

const Message = ({ variant = 'info', children , style }) => {
  return (
    <Alert variant={variant} style={style}>
      {children}
    </Alert>
  );
};

export default Message; // Export the Message component as the default export
