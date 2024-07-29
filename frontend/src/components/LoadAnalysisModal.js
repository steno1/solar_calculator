import { Button, Col, Form, Modal, Row } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import React, { useState } from 'react'; // Import React

import Message from '../components/Message'; // Import the Message component for displaying error messages

const LoadAnalysisModal = ({ 
  show, // Prop to control the visibility of the modal
  onHide, // Prop to handle closing the modal
  appliances, // Prop for the current state of appliance input fields
  handleChangeAppliance, // Prop for handling changes in the input fields for appliances
  handleAddAppliance, // Prop for adding a new appliance input field
  handleRemoveAppliance, // Prop for removing an appliance input field
  handleLoadAnalysis, // Prop for handling the load analysis calculation
  loadErrorState, // Prop for any error state related to load analysis
  loadData // Prop for the calculated load data
}) => {
  const [validationError, setValidationError] = useState(null);

  const handleValidationAndLoadAnalysis = () => {
    // Validate that all fields are filled out and have valid numbers
    for (let appliance of appliances) {
      if (!appliance.name || !appliance.quantity || !appliance.power || !appliance.powerFactor || !appliance.hoursOfUse) {
        setValidationError('All fields are required.');
        return;
      }
      if (isNaN(appliance.quantity) || isNaN(appliance.power) || isNaN(appliance.powerFactor) || isNaN(appliance.hoursOfUse)) {
        setValidationError('All fields must be valid numbers.');
        return;
      }
      if (appliance.powerFactor <= 0) {
        setValidationError('Power Factor must be greater than zero.');
        return;
      }
    }
    setValidationError(null);
    handleLoadAnalysis();
  };

  return (
    <Modal show={show} onHide={onHide}> {/* Modal component from react-bootstrap, controlled by show and onHide props */}
      <Modal.Header closeButton> {/* Modal header with a close button */}
        <Modal.Title>Load Analysis</Modal.Title> {/* Modal title */}
      </Modal.Header>
      <Modal.Body> {/* Modal body containing the form */}
        <Form> {/* Form component from react-bootstrap */}
          {appliances.map((appliance, index) => ( // Map over appliances array to create input fields for each appliance
            <div key={index} className="mb-3"> {/* Key for each appliance for React to keep track of the elements */}
              <Row> {/* Row component for Bootstrap grid layout */}
                <Col> {/* Column component */}
                  <Form.Group> {/* Form group for appliance name input */}
                    <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
                      Appliance Name
                    </Form.Label>
                    <Form.Control
                      type="text" // Input type
                      name="name" // Input name
                      value={appliance.name} // Input value from the appliance state
                      onChange={(event) => handleChangeAppliance(index, event)} // Change handler
                      required // Make this field required
                    />
                  </Form.Group>
                </Col>
                <Col> {/* Column component */}
                  <Form.Group> {/* Form group for appliance quantity input */}
                    <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
                      Quantity
                    </Form.Label>
                    <Form.Control
                      type="number" // Input type
                      name="quantity" // Input name
                      value={appliance.quantity} // Input value from the appliance state
                      onChange={(event) => handleChangeAppliance(index, event)} // Change handler
                      required // Make this field required
                      min="0" // Ensure positive values
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row> {/* Row component for next set of inputs */}
                <Col> {/* Column component */}
                  <Form.Group> {/* Form group for appliance power input */}
                    <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
                      Power (Watts)
                    </Form.Label>
                    <Form.Control
                      type="number" // Input type
                      name="power" // Input name
                      value={appliance.power} // Input value from the appliance state
                      onChange={(event) => handleChangeAppliance(index, event)} // Change handler
                      required // Make this field required
                      min="0" // Ensure positive values
                    />
                  </Form.Group>
                </Col>
                <Col> {/* Column component */}
                  <Form.Group> {/* Form group for appliance power factor input */}
                    <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
                      Power Factor
                    </Form.Label>
                    <Form.Control
                      type="number" // Input type
                      name="powerFactor" // Input name
                      value={appliance.powerFactor} // Input value from the appliance state
                      onChange={(event) => handleChangeAppliance(index, event)} // Change handler
                      required // Make this field required
                      min="0" // Ensure positive values
                      step="0.01" // Allow decimal values
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row> {/* Row component for next set of inputs */}
                <Col> {/* Column component */}
                  <Form.Group> {/* Form group for appliance hours of use input */}
                    <Form.Label style={{ color: 'white' }}> {/* Form label with custom color */}
                      Hours of Use
                    </Form.Label>
                    <Form.Control
                      type="number" // Input type
                      name="hoursOfUse" // Input name
                      value={appliance.hoursOfUse} // Input value from the appliance state
                      onChange={(event) => handleChangeAppliance(index, event)} // Change handler
                      required // Make this field required
                      min="0" // Ensure positive values
                    />
                  </Form.Group>
                </Col>
                <Col> {/* Column component for the remove button */}
                  {index !== 0 && ( // Show remove button only for appliances other than the first one
                    <Button variant="danger" className="mt-4" onClick={() => handleRemoveAppliance(index)}> {/* Remove button */}
                      Remove
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          ))}
          <Button variant="primary" className="mt-2" onClick={handleAddAppliance}> {/* Add Appliance button */}
            Add Appliance
          </Button>
        </Form>
        {validationError && <Message variant="danger" style={{ marginTop: '10px' }}>{validationError}</Message>} {/* Display validation error message if any */}
        {loadErrorState && <Message variant="danger">{loadErrorState}</Message>} {/* Display error message if any */}
        {loadData && ( // Display results if loadData is available
          <div className="mt-3">
            <h5>Results:</h5>
            <p>Total Daily Energy Demand: {loadData.totalEnergyDemand} Wh</p>
            <p>Total Apparent Power: {loadData.totalApparentPower} VA</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer> {/* Modal footer with action buttons */}
        <Button variant="secondary" onClick={onHide}> {/* Close button */}
          Close
        </Button>
        <Button variant="primary" onClick={handleValidationAndLoadAnalysis}> {/* Calculate button */}
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoadAnalysisModal; // Export the component as default
