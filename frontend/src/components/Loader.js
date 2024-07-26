import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component from React Bootstrap

const Loader = () => {
  return (
    <Spinner 
      animation="border" // Animation style for the spinner
      role="status" // ARIA role to denote status for accessibility
      style={{
        width: "100px", // Width of the spinner
        height: "100px", // Height of the spinner
        margin: "auto", // Center the spinner horizontally
        display: "block" // Ensure the spinner is displayed as a block element
      }}
    >
    </Spinner>
  );
}

export default Loader; // Export the Loader component as the default export
