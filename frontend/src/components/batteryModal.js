import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import { useCalculateBatterySizingMutation } from '../slices/batteryApiSlice'; // Import the mutation hook for battery sizing

// Define the BatterySizingModal component
const BatterySizingModal = ({ show, onHide }) => {
  // State hook for battery sizing inputs
  const [batteryInput, setBatteryInput] = useState({
    dailyEnergyDemand: '',
    systemVoltage: '',
    batteryVoltage: '',
    batteryCapacityAh: '',
    depthOfDischarge: ''
  });

  // Use the mutation hook to handle battery sizing calculation
  const [calculateBatterySizing, { data: batteryData, isLoading: isBatteryLoading, isError: isBatteryError, error: batteryError }] = useCalculateBatterySizingMutation();

  // Handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBatteryInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(batteryInput).some(value => value === '')) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await calculateBatterySizing(batteryInput);
    } catch (error) {
      console.error('Error calculating battery sizing:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Battery Sizing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dailyEnergyDemand">
            <Form.Label>Consumer Daily Energy Demand (Wh)</Form.Label>
            <Form.Control
              type="number"
              name="dailyEnergyDemand"
              value={batteryInput.dailyEnergyDemand}
              onChange={handleChange}
              required
             
            />
          </Form.Group>
          <Form.Group controlId="systemVoltage">
            <Form.Label>System Voltage (V)</Form.Label>
            <Form.Control
              type="number"
              name="systemVoltage"
              value={batteryInput.systemVoltage}
              onChange={handleChange}
              required
              
            />
          </Form.Group>
          <Form.Group controlId="batteryVoltage">
            <Form.Label>Battery Voltage (V)</Form.Label>
            <Form.Control
              type="number"
              name="batteryVoltage"
              value={batteryInput.batteryVoltage}
              onChange={handleChange}
              required
            
            />
          </Form.Group>
          <Form.Group controlId="batteryCapacityAh">
            <Form.Label>Battery Capacity (Ah)</Form.Label>
            <Form.Control
              type="number"
              name="batteryCapacityAh"
              value={batteryInput.batteryCapacityAh}
              onChange={handleChange}
              required
            
            />
          </Form.Group>
          <Form.Group controlId="depthOfDischarge">
            <Form.Label>Depth of Discharge (%)</Form.Label>
            <Form.Control
              type="number"
              name="depthOfDischarge"
              value={batteryInput.depthOfDischarge}
              onChange={handleChange}
              required
          
            />
          </Form.Group>
          <div className="mt-3">
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="ms-2" disabled={isBatteryLoading}>
              {isBatteryLoading ? 'Calculating...' : 'Calculate'}
            </Button>
          </div>
        </Form>
        {isBatteryError && <div className="text-danger mt-3">{batteryError.message}</div>}
        {batteryData && (
          <div className="mt-3">
            <h5>Battery Sizing Results</h5>
            <p style={{ fontSize: '0.9rem' }}>Battery Bank Capacity: {batteryData.batteryBankCapacity} Ah</p>
            <p style={{ fontSize: '0.9rem' }}>Number of Batteries in Parallel: {batteryData.numberOfBatteriesInParallel}</p>
            <p style={{ fontSize: '0.9rem' }}>Number of Batteries in Series: {batteryData.numberOfBatteriesInSeries}</p>
            <p style={{ fontSize: '0.9rem' }}>Total Number of Batteries: {batteryData.totalNumberOfBatteries}</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BatterySizingModal;
