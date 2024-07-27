// Import custom styles for the HomeScreen component

import '../styles.css';
import '../footerFix.css'; // Import custom CSS

import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { FaBatteryHalf, FaChargingStation, FaCogs, FaSolarPanel } from 'react-icons/fa';
import React, { useState } from 'react';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ToastMessage from '../components/Toast';
import { useCalculateLoadAnalysisMutation } from '../slices/loadApiSlice'; // Import the custom hook for load analysis mutation

const HomeScreen = () => {
  // State to control the visibility of the Load Analysis Modal
  const [showLoadAnalysisModal, setShowLoadAnalysisModal] = useState(false);
  // State to control the visibility of the Toast message
  const [showToast, setShowToast] = useState(false);
  // State to store the message to be displayed in the Toast
  const [toastMessage, setToastMessage] = useState('');
  // State to store the variant of the Toast message (e.g., success, danger)
  const [toastVariant, setToastVariant] = useState('info');
  
  // Custom hook to handle load analysis mutation, destructuring relevant data and statuses
  const [calculateLoadAnalysis, { data, isLoading, isError, error }] = useCalculateLoadAnalysisMutation();
  
  // State to store the list of appliances with their properties
  const [appliances, setAppliances] = useState([
    { name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }
  ]);

  // Function to handle the load analysis calculation
  const handleLoadAnalysis = async () => {
    try {
      // Perform the load analysis calculation and get the result
      const result = await calculateLoadAnalysis({ appliances }).unwrap();
      // Set the Toast message and variant to display success
      setToastMessage(result.message);
      setToastVariant('success');
      setShowToast(true);
      console.log(result);
    } catch (err) {
      // Handle any errors and display the error message in the Toast
      setToastMessage(err.message);
      setToastVariant('danger');
      setShowToast(true);
      console.error('Failed to fetch:', err);
    }
  };

  // Function to add a new appliance to the list
  const handleAddAppliance = () => {
    setAppliances([...appliances, { name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }]);
  };

  // Function to handle changes in appliance properties
  const handleChangeAppliance = (index, event) => {
    const { name, value } = event.target;
    const newAppliances = [...appliances];
    newAppliances[index][name] = value;
    setAppliances(newAppliances);
  };

  return (
    <>
    <div className="home-background"> {/* Apply background styling */}
      <Container className="mt-5"> {/* Center the content with margin-top */}
        <h1 className="text-center mb-4">Princeley Solar Calculator</h1> {/* Page title */}
        <Row className="justify-content-center"> {/* Center the cards in a row */}
          {/* Load Analysis Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark"> {/* Apply custom card styling */}
              <Card.Body>
                <Card.Title className="text-center">Load Analysis</Card.Title> {/* Card title */}
                <Button variant="primary" className="button-style" onClick={() => setShowLoadAnalysisModal(true)}>
                  Analyze {/* Button to open Load Analysis Modal */}
                </Button>
                {isLoading && <Loader />} {/* Show loader if data is loading */}
                {isError && <Message variant="danger">{error.message}</Message>} {/* Show error message if there's an error */}
                {data && (
                  <div className="text-center">
                    <p>Total Apparent Power: {parseFloat(data.totalApparentPower).toFixed(2)} VA</p> {/* Display total apparent power */}
                    <p>Total Energy Demand: {parseFloat(data.totalEnergyDemand).toFixed(2)} VA·h</p> {/* Display total energy demand */}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Panel Size Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Panel Size Sizing</Card.Title> {/* Card title */}
                <Button variant="primary" className="button-style" href="#panel-sizing">
                  <FaSolarPanel size={20} className="mr-2"/> Panel Sizing {/* Button to navigate to panel sizing section */}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Battery Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Battery Sizing</Card.Title> {/* Card title */}
                <Button variant="primary" className="button-style" href="#battery-sizing">
                  <FaBatteryHalf size={20} className="mr-2"/> Battery Sizing {/* Button to navigate to battery sizing section */}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Charge Controller Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Charge Controller Sizing</Card.Title> {/* Card title */}
                <Button variant="primary" className="button-style" href="#charge-controller-sizing">
                  <FaChargingStation size={20} className="mr-2"/> Charge Controller Sizing {/* Button to navigate to charge controller sizing section */}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Inverter Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Inverter Sizing</Card.Title> {/* Card title */}
                <Button variant="primary" className="button-style" href="#inverter-sizing">
                  <FaCogs size={20} className="mr-2"/> Inverter Sizing {/* Button to navigate to inverter sizing section */}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Load Analysis Modal */}
        <Modal show={showLoadAnalysisModal} onHide={() => setShowLoadAnalysisModal(false)}> {/* Modal for Load Analysis */}
          <Modal.Header closeButton>
            <Modal.Title>Load Analysis</Modal.Title> {/* Modal title */}
          </Modal.Header>
          <Modal.Body>
            <Form className="form-dark"> {/* Form to input appliance details */}
              {appliances.map((appliance, index) => (
                <div key={index} className="mb-4">
                  <Form.Group className="margin-bottom">
                    <Form.Label className="form-label">Appliance Name {index + 1}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter appliance name"
                      name="name"
                      value={appliance.name}
                      onChange={(e) => handleChangeAppliance(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="margin-bottom">
                    <Form.Label className="form-label">Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter quantity"
                      name="quantity"
                      value={appliance.quantity}
                      onChange={(e) => handleChangeAppliance(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="margin-bottom">
                    <Form.Label className="form-label">Power (W)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter power"
                      name="power"
                      value={appliance.power}
                      onChange={(e) => handleChangeAppliance(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="margin-bottom">
                    <Form.Label className="form-label">Power Factor</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter power factor"
                      name="powerFactor"
                      step="0.01"
                      value={appliance.powerFactor}
                      onChange={(e) => handleChangeAppliance(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="margin-bottom">
                    <Form.Label className="form-label">Hours of Use</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter hours of use"
                      name="hoursOfUse"
                      value={appliance.hoursOfUse}
                      onChange={(e) => handleChangeAppliance(index, e)}
                    />
                  </Form.Group>
                </div>
              ))}
              <div className="d-flex justify-content-between">
                <Button variant="secondary" className="modal-button" onClick={handleAddAppliance}>Add Another Appliance</Button>
                <Button variant="primary" style={{ marginLeft: '10px' }} className="calculate-button" onClick={handleLoadAnalysis}>Calculate</Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLoadAnalysisModal(false)}>Close</Button> {/* Close button */}
          </Modal.Footer>
          <ToastMessage show={showToast} onClose={() => setShowToast(false)} message={toastMessage} variant={toastVariant} /> {/* Toast message */}
        </Modal>
      </Container>
    
    </div>
   <div>

   <Footer className='footer-container' />
   </div>
    </>

  );
};

export default HomeScreen; // Export the HomeScreen component
