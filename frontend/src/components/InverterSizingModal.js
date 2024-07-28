import { Button, Form, Modal } from 'react-bootstrap'; // Import necessary components from react-bootstrap

import Message from '../components/Message'; // Import the Message component for displaying error messages
import React from 'react'; // Import React

const InverterSizingModal = ({ 
  show, // Prop to control the visibility of the modal
  onHide, // Prop to handle closing the modal
  inverterInput, // Prop for the current state of inverter input fields
  handleChangeInverterInput, // Prop for handling changes in the input fields
  handleInverterSizing, // Prop for handling the inverter sizing calculation
  inverterErrorState, // Prop for any error state related to inverter sizing
  inverterData // Prop for the calculated inverter data
}) => (
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
          />
        </Form.Group>
      </Form>
      {inverterErrorState && <Message variant="danger">{inverterErrorState}</Message>} {/* Display error message if any */}
      {inverterData && ( // Display results if inverterData is available
        <div className="mt-3">
          <h5>Results:</h5>
          <p>Required Inverter Capacity: {inverterData.inverterCapacity} VA</p>
          <p>Inverter Run Time: {inverterData.inverterRunTime} hours</p>
          <p>Consumer Daily Energy Demand: {inverterData.consumerEnergyDemand} Wh</p>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer> {/* Modal footer with action buttons */}
      <Button variant="secondary" onClick={onHide}> {/* Close button */}
        Close
      </Button>
      <Button variant="primary" onClick={handleInverterSizing}> {/* Calculate button */}
        Calculate
      </Button>
    </Modal.Footer>
  </Modal>
);

export default InverterSizingModal; // Export the component as default
