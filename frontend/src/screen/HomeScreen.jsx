// Import necessary styles and CSS files

import '../styles.css';
import '../footerFix.css'; // Import custom CSS
import 'react-toastify/dist/ReactToastify.css';

import { Col, Container, Row } from 'react-bootstrap';
import { FaBatteryHalf, FaBolt, FaChargingStation, FaCogs, FaSolarPanel } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

import FeatureCard from '../components/FeatureCard.js';
import Footer from '../components/Footer';
import InverterSizingModal from '../components/InverterSizingModal.js';
import LoadAnalysisModal from '../components/LoadAnalysisModal.js';
import { useCalculateInverterSizingMutation } from '../slices/inverterApiSlice'; // Import the custom hook for inverter sizing mutation
import { useCalculateLoadAnalysisMutation } from '../slices/loadApiSlice'; // Import the custom hook for load analysis mutation

//import Loader from '../components/Loader';
//import Message from '../components/Message';

const HomeScreen = () => {
  // State variables for modals
  const [showLoadAnalysisModal, setShowLoadAnalysisModal] = useState(false);
  const [showInverterSizingModal, setShowInverterSizingModal] = useState(false);

  // Initialize mutations and extract relevant states
  const [calculateLoadAnalysis, { data: loadData, isLoading: isLoadLoading, isError: isLoadError, error: loadError }] = useCalculateLoadAnalysisMutation();
  const [calculateInverterSizing, { data: inverterData, isLoading: isInverterLoading, isError: isInverterError, error: inverterError }] = useCalculateInverterSizingMutation();

  // State variables for appliances and inverter input
  const [appliances, setAppliances] = useState([{ name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }]);
  const [inverterInput, setInverterInput] = useState({ totalEnergyDemand: 0, apparentPower: 0, inverterEfficiency: 0 });

  // State variables for error messages
  const [loadErrorState, setLoadErrorState] = useState(null);
  const [inverterErrorState, setInverterErrorState] = useState(null);

  // Effect to reset error messages when opening modals
  useEffect(() => {
    if (showLoadAnalysisModal || showInverterSizingModal) {
      setLoadErrorState(null);
      setInverterErrorState(null);
    }
  }, [showLoadAnalysisModal, showInverterSizingModal]);

  // Handler to update appliance state
  const handleChangeAppliance = (index, event) => {
    const { name, value } = event.target;
    const updatedAppliances = [...appliances];
    updatedAppliances[index][name] = value;
    setAppliances(updatedAppliances);
  };

  // Handler to add a new appliance
  const handleAddAppliance = () => {
    setAppliances([...appliances, { name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }]);
  };

  // Handler to remove an appliance
  const handleRemoveAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  // Handler to perform load analysis
  const handleLoadAnalysis = async () => {
    try {
      await calculateLoadAnalysis({ appliances });
    } catch (error) {
      setLoadErrorState(error.message);
    }
  };

  // Handler to update inverter input state
  const handleChangeInverterInput = (event) => {
    const { name, value } = event.target;
    setInverterInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Handler to perform inverter sizing
  const handleInverterSizing = async () => {
    try {
      await calculateInverterSizing(inverterInput);
    } catch (error) {
      setInverterErrorState(error.message);
    }
  };

  return (
    <div>
      <Container className="my-5">
        <h1 className="text-center" style={{ color: 'white' }}>Solar PV System Sizing Calculator</h1>
        <Row>
          <Col md={6} lg={4} className="my-3">
            <FeatureCard
              title="Load Analysis"
              icon={<FaCogs />}
              onClick={() => setShowLoadAnalysisModal(true)}
              isLoading={isLoadLoading}
              isError={isLoadError}
              error={loadError}
            />
          </Col>
          <Col md={6} lg={4} className="my-3">
            <FeatureCard
              title="Panel Sizing"
              icon={<FaSolarPanel />}
              onClick={() => console.log('Panel Sizing')}
            />
          </Col>
          <Col md={6} lg={4} className="my-3">
            <FeatureCard
              title="Inverter Sizing"
              icon={<FaChargingStation />}
              onClick={() => setShowInverterSizingModal(true)}
              isLoading={isInverterLoading}
              isError={isInverterError}
              error={inverterError}
            />
          </Col>
          <Col md={6} lg={4} className="my-3">
            <FeatureCard
              title="Battery Sizing"
              icon={<FaBatteryHalf />}
              onClick={() => console.log('Battery Sizing')}
            />
          </Col>
          <Col md={6} lg={4} className="my-3">
            <FeatureCard
              title="Charge Controller Sizing"
              icon={<FaBolt />}
              onClick={() => console.log('Charge Controller Sizing')}
            />
          </Col>
        </Row>
      </Container>
      <Footer />

      <LoadAnalysisModal
        show={showLoadAnalysisModal}
        onHide={() => setShowLoadAnalysisModal(false)}
        appliances={appliances}
        handleChangeAppliance={handleChangeAppliance}
        handleAddAppliance={handleAddAppliance}
        handleRemoveAppliance={handleRemoveAppliance}
        handleLoadAnalysis={handleLoadAnalysis}
        loadErrorState={loadErrorState}
        loadData={loadData}
      />

      <InverterSizingModal
        show={showInverterSizingModal}
        onHide={() => setShowInverterSizingModal(false)}
        inverterInput={inverterInput}
        handleChangeInverterInput={handleChangeInverterInput}
        handleInverterSizing={handleInverterSizing}
        inverterErrorState={inverterErrorState}
        inverterData={inverterData}
      />
    </div>
  );
};

export default HomeScreen; // Export the HomeScreen component as default
