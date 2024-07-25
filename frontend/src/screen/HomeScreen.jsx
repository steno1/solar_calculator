import '../styles.css';

import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { FaBatteryHalf, FaChargingStation, FaCogs, FaSolarPanel } from 'react-icons/fa';
import React, { useState } from 'react';

import { useCalculateLoadAnalysisMutation } from '../slices/loadApiSlice';

const HomeScreen = () => {
  const [showLoadAnalysisModal, setShowLoadAnalysisModal] = useState(false);
  const [calculateLoadAnalysis, { data, isLoading, isError, error }] = useCalculateLoadAnalysisMutation();
  const [appliances, setAppliances] = useState([
    { name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }
  ]);

  const handleLoadAnalysis = async () => {
    try {
      const result = await calculateLoadAnalysis({ appliances }).unwrap();
      console.log(result);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  const handleAddAppliance = () => {
    setAppliances([...appliances, { name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }]);
  };

  const handleChangeAppliance = (index, event) => {
    const { name, value } = event.target;
    const newAppliances = [...appliances];
    newAppliances[index][name] = value;
    setAppliances(newAppliances);
  };

  return (
    <div className="home-background"> {/* Apply the background color to the full screen */}
      <Container className="mt-5">
        <h1 className="text-center mb-4">Solar PV Calculator</h1>
        <Row className="justify-content-center">
          {/* Load Analysis Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Load Analysis</Card.Title>
                <Button variant="primary" className="button-style" onClick={() => setShowLoadAnalysisModal(true)}>
                  Analyze
                </Button>
                {isLoading && <p className="text-center">Loading...</p>}
                {isError && <p className="text-center">Error: {error.message}</p>}
                {data && (
                  <div className="text-center">
                    <p>Total Apparent Power: {data.totalApparentPower} VA</p>
                    <p>Total Energy Demand: {data.totalEnergyDemand} VA·h</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Panel Size Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Panel Size Sizing</Card.Title>
                <Button variant="primary" className="button-style" href="#panel-sizing">
                  <FaSolarPanel size={20} className="mr-2"/> Panel Sizing
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Battery Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Battery Sizing</Card.Title>
                <Button variant="primary" className="button-style" href="#battery-sizing">
                  <FaBatteryHalf size={20} className="mr-2"/> Battery Sizing
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Charge Controller Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Charge Controller Sizing</Card.Title>
                <Button variant="primary" className="button-style" href="#charge-controller-sizing">
                  <FaChargingStation size={20} className="mr-2"/> Charge Controller Sizing
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Inverter Sizing Card */}
          <Col md={4} className="mb-4">
            <Card className="card-style card-dark">
              <Card.Body>
                <Card.Title className="text-center">Inverter Sizing</Card.Title>
                <Button variant="primary" className="button-style" href="#inverter-sizing">
                  <FaCogs size={20} className="mr-2"/> Inverter Sizing
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Load Analysis Modal */}
        <Modal show={showLoadAnalysisModal} onHide={() => setShowLoadAnalysisModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Load Analysis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-dark">
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
               
               
         <Button variant="primary"   style={{ marginLeft: '10px' }}
         className="calculate-button" onClick={handleLoadAnalysis}>Calculate</Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLoadAnalysisModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default HomeScreen;
