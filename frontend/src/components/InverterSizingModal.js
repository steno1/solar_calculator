import { Button, Form, Modal } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import React, { useState } from 'react'; // Import React and useState

import Message from '../components/Message'; // Import the Message component for displaying error messages

const InverterSizingModal = ({
  show, // Prop to control the visibility of the modal
  onHide, // Prop to handle closing the modal
  inverterInput, // Prop for the current state of inverter input fields
  handleChangeInverterInput, // Prop for handling changes in the input fields
  handleInverterSizing, // Prop for handling the inverter sizing calculation
  inverterErrorState, // Prop for any error state related to inverter sizing
  inverterData // Prop for the calculated inverter data
}) => {
  const [validationError, setValidationError] = useState(null); // State for validation errors

  const handleValidationAndInverterSizing = () => {
    // Validate that all fields are filled out
    if (!inverterInput.totalEnergyDemand || !inverterInput.apparentPower || !inverterInput.inverterEfficiency) {
      setValidationError('All fields are required.');
      return; // Stop if validation fails
    }
    setValidationError(null); // Clear any existing validation errors
    console.log('Inverter Input before sizing:', inverterInput); // Log the input values
    handleInverterSizing(); // Call the function to handle inverter sizing
  };

  console.log('Inverter Data:', inverterData); // Log the inverter data received

  return (
    <Modal show={show} onHide={onHide}> {/* Modal component from react-bootstrap, controlled by show and onHide props */}
      <Modal.Header closeButton> {/* Modal header with a close button */}
        <Modal.Title>Inverter Sizing</Modal.Title> {/* Modal title */}
      </Modal.Header>
      <Modal.Body> {/* Modal body containing the form */}
        <Form> {/* Form component from react-bootstrap */}
          <Form.Group className="mb-3"> {/* Form group for total energy demand input */}
            <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
              Total Daily Energy Demand (Wh)
            </Form.Label>
            <Form.Control
              type="number" // Input type
              name="totalEnergyDemand" // Input name
              value={inverterInput.totalEnergyDemand} // Input value from the inverterInput state
              onChange={handleChangeInverterInput} // Change handler
              required // Make this field required
              style={{ color: 'black' }} // Change input text color to black
            />
          </Form.Group>
          <Form.Group className="mb-3"> {/* Form group for apparent power input */}
            <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
              Apparent Power (VA)
            </Form.Label>
            <Form.Control
              type="number" // Input type
              name="apparentPower" // Input name
              value={inverterInput.apparentPower} // Input value from the inverterInput state
              onChange={handleChangeInverterInput} // Change handler
              required // Make this field required
              style={{ color: 'black' }} // Change input text color to black
            />
          </Form.Group>
          <Form.Group className="mb-3"> {/* Form group for inverter efficiency input */}
            <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
              Inverter Efficiency (%)
            </Form.Label>
            <Form.Control
              type="number" // Input type
              name="inverterEfficiency" // Input name
              value={inverterInput.inverterEfficiency} // Input value from the inverterInput state
              onChange={handleChangeInverterInput} // Change handler
              required // Make this field required
              style={{ color: 'black' }} // Change input text color to black
            />
          </Form.Group>
        </Form>
        {validationError && <Message variant="danger">{validationError}</Message>} {/* Display validation errors */}
        {inverterErrorState && <Message variant="danger">{inverterErrorState}</Message>} {/* Display inverter sizing errors */}
        {inverterData && ( // If inverterData exists, display the results
          <div>
            <h4>Inverter Sizing Result</h4>
            <p>Inverter Capacity: {inverterData.inverterCapacity} VA</p>
            <p>Inverter Run Time: {inverterData.inverterRunTime} hours</p>
            <p>Inverter Standby: {inverterData.inverterStandby} VA</p>
            <p>Consumer Energy Demand: {inverterData.consumerEnergyDemand} Wh</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer> {/* Modal footer with action buttons */}
        <Button variant="secondary" onClick={onHide}> {/* Close button */}
          Close
        </Button>
        <Button variant="primary" onClick={handleValidationAndInverterSizing}> {/* Calculate button */}
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InverterSizingModal; // Export the component
