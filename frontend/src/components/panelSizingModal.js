// Import necessary components from 'react-bootstrap'

import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import Message from '../components/Message';

// Import React and useState hook for managing state

// Import a custom Message component for displaying error messages


// Define the PanelSizingModal component
const PanelSizingModal = ({
  show, // Boolean to control modal visibility
  onHide, // Function to call when closing the modal
  panelInput, // Object containing input values for the form
  handleChangePanelInput, // Function to handle changes in input fields
  handlePanelSizing, // Function to call for calculating panel sizing
  panelErrorState, // Error state related to panel sizing
  panelData, // Data returned from the panel sizing calculation
}) => {
  // State to manage validation error messages
  const [validationError, setValidationError] = useState(null);

  // Function to validate inputs and trigger panel sizing calculation
  const handleValidationAndPanelSizing = () => {
    // Check if all required fields are filled
    if (!panelInput.dailyEnergyDemand || !panelInput.panelEfficiency || !panelInput.peakSunHours || !panelInput.panelWattage || !panelInput.systemVoltage || !panelInput.panelVoltRating) {
      setValidationError('All fields are required.'); // Set validation error message if fields are missing
      return; // Exit the function to prevent further processing
    }
    setValidationError(null); // Clear any existing validation error
    handlePanelSizing(); // Call the function to handle panel sizing calculation
  };

  return (
    // Render the modal component from 'react-bootstrap'
    <Modal show={show} onHide={onHide}>
      {/* Modal Header with a close button and title */}
      <Modal.Header closeButton>
        <Modal.Title>Panel Sizing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form for collecting panel sizing inputs */}
        <Form>
          {/* Form group for Consumer Daily Energy Demand */}
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Consumer Daily Energy Demand (Wh)</Form.Label>
            <Form.Control
              type="number" // Input type for numbers
              name="dailyEnergyDemand" // Name of the input field
              value={panelInput.dailyEnergyDemand} // Value bound to state
              onChange={handleChangePanelInput} // Handler for input changes
              required // Make this field required
            />
          </Form.Group>
          {/* Form group for Panel Efficiency */}
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Panel Efficiency (%)</Form.Label>
            <Form.Control
              type="number"
              name="panelEfficiency"
              value={panelInput.panelEfficiency}
              onChange={handleChangePanelInput}
              required
            />
          </Form.Group>
          {/* Form group for Peak Sun Hours */}
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Peak Sun Hours</Form.Label>
            <Form.Control
              type="number"
              name="peakSunHours"
              value={panelInput.peakSunHours}
              onChange={handleChangePanelInput}
              required
            />
          </Form.Group>
          {/* Form group for Panel Wattage */}
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Panel Wattage (W)</Form.Label>
            <Form.Control
              type="number"
              name="panelWattage"
              value={panelInput.panelWattage}
              onChange={handleChangePanelInput}
              required
            />
          </Form.Group>
          {/* Form group for System Voltage */}
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>System Voltage (V)</Form.Label>
            <Form.Control
              type="number"
              name="systemVoltage"
              value={panelInput.systemVoltage}
              onChange={handleChangePanelInput}
              required
            />
          </Form.Group>
          {/* Form group for Panel Volt Rating */}
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Panel Volt Rating (V)</Form.Label>
            <Form.Control
              type="number"
              name="panelVoltRating"
              value={panelInput.panelVoltRating}
              onChange={handleChangePanelInput}
              required
            />
          </Form.Group>
        </Form>
        {/* Display validation error if any */}
        {validationError && <Message variant="danger" style={{ marginTop: '10px' }}>{validationError}</Message>}
        {/* Display panel error state if any */}
        {panelErrorState && <Message variant="danger">{panelErrorState}</Message>}
        {/* Display panel sizing results if available */}
        {panelData && (
          <div className="mt-3">
            <h5>Results:</h5>
            <p>Total PV Power: {panelData.totalPvPower} W</p>
            <p>Number of Panels: {panelData.numberOfPanels}</p>
            <p>Connections in Series: {panelData.connectionsInSeries}</p>
            <p>Connections in Parallel: {panelData.connectionsInParallel}</p>
          </div>
        )}
      </Modal.Body>
      {/* Modal Footer with buttons */}
      <Modal.Footer>
        {/* Button to close the modal */}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {/* Button to trigger panel sizing calculation */}
        <Button variant="primary" onClick={handleValidationAndPanelSizing}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the PanelSizingModal component for use in other parts of the application
export default PanelSizingModal;
