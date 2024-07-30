import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import { useCalculateChargeControllerMutation } from '../slices/chargeControllerApiSlice'; // Import the correct mutation hook

const ChargeControllerSizingModal = ({ show, onHide }) => {
  const [chargeControllerInput, setChargeControllerInput] = useState({
    numberOfPanelsInParallel: '',
    shortCircuitCurrent: ''
  });

  const [calculateChargeControllerSizing, { data: chargeControllerData, isLoading: isChargeControllerLoading, isError: isChargeControllerError, error: chargeControllerError }] = useCalculateChargeControllerMutation(); // Use the correct hook

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChargeControllerInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(chargeControllerInput).some(value => value === '')) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await calculateChargeControllerSizing(chargeControllerInput);
    } catch (error) {
      console.error('Error calculating charge controller sizing:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Charge Controller Sizing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="numberOfPanelsInParallel">
            <Form.Label>Number of Panels in Parallel</Form.Label>
            <Form.Control
              type="number"
              name="numberOfPanelsInParallel"
              value={chargeControllerInput.numberOfPanelsInParallel}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="shortCircuitCurrent">
            <Form.Label>Short Circuit Current (Isc)</Form.Label>
            <Form.Control
              type="number"
              name="shortCircuitCurrent"
              value={chargeControllerInput.shortCircuitCurrent}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="mt-3">
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="ms-2" disabled={isChargeControllerLoading}>
              {isChargeControllerLoading ? 'Calculating...' : 'Calculate'}
            </Button>
          </div>
        </Form>
        {isChargeControllerError && <div className="text-danger mt-3">{chargeControllerError.message}</div>}
        {chargeControllerData && (
          <div className="mt-3">
            <h5>Charge Controller Sizing Results</h5>
            <p style={{ fontSize: '0.9rem' }}>Maximum Current (Imax): {chargeControllerData.maximumCurrent} A</p>
            <p style={{ fontSize: '0.9rem' }}>Charge Controller Capacity: {chargeControllerData.chargeControllerCapacity} A</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChargeControllerSizingModal;
