// Import styles and CSS files for the component

import '../styles.css';
import '../footerFix.css';
import 'react-toastify/dist/ReactToastify.css';

import { Col, Container, Row } from 'react-bootstrap';
import { FaBatteryHalf, FaBolt, FaChargingStation, FaCogs, FaSolarPanel } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

import FeatureCard from '../components/FeatureCard.js';
import Footer from '../components/Footer';
import InverterSizingModal from '../components/InverterSizingModal.js';
import LoadAnalysisModal from '../components/LoadAnalysisModal.js';
import PanelSizingModal from '../components/panelSizingModal.js'; // Updated import path
import { useCalculateInverterSizingMutation } from '../slices/inverterApiSlice';
import { useCalculateLoadAnalysisMutation } from '../slices/loadApiSlice';
import { useCalculatePanelSizingMutation } from '../slices/panelApiSlice';

// Import components and libraries from 'react-bootstrap' for layout and styling

// Import icons from 'react-icons/fa' for use in feature cards

// Import React and hooks from React library


// Import custom components for feature cards, footer, and modals






// Import hooks from slices to handle API requests




// Define the HomeScreen component
const HomeScreen = () => {
  // State hooks for managing modal visibility
  const [showLoadAnalysisModal, setShowLoadAnalysisModal] = useState(false);
  const [showInverterSizingModal, setShowInverterSizingModal] = useState(false);
  const [showPanelSizingModal, setShowPanelSizingModal] = useState(false);

  // Hooks for managing API requests and their states
  const [calculateLoadAnalysis, { data: loadData, isLoading: isLoadLoading, isError: isLoadError, error: loadError }] = useCalculateLoadAnalysisMutation();
  const [calculateInverterSizing, { data: inverterData, isLoading: isInverterLoading, isError: isInverterError, error: inverterError }] = useCalculateInverterSizingMutation();
  const [calculatePanelSizing, { data: panelData, isLoading: isPanelLoading, isError: isPanelError, error: panelError }] = useCalculatePanelSizingMutation();

  // State hooks for managing inputs and errors
  const [appliances, setAppliances] = useState([{ name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }]);
  const [inverterInput, setInverterInput] = useState({ totalEnergyDemand: 0, apparentPower: 0, inverterEfficiency: 0 });
  const [panelInput, setPanelInput] = useState({
    dailyEnergyDemand: 0,
    panelEfficiency: 0,
    peakSunHours: 0,
    panelWattage: 0,
    systemVoltage: 0,
    panelVoltRating: 0
  });

  // State hooks for managing error messages
  const [loadErrorState, setLoadErrorState] = useState(null);
  const [inverterErrorState, setInverterErrorState] = useState(null);
  const [panelErrorState, setPanelErrorState] = useState(null);

  // Effect hook to reset error states when any modal is shown
  useEffect(() => {
    if (showLoadAnalysisModal || showInverterSizingModal || showPanelSizingModal) {
      setLoadErrorState(null);
      setInverterErrorState(null);
      setPanelErrorState(null);
    }
  }, [showLoadAnalysisModal, showInverterSizingModal, showPanelSizingModal]);

  // Handlers for changing appliance details
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

  // Function to handle load analysis
  const handleLoadAnalysis = async () => {
    try {
      await calculateLoadAnalysis({ appliances });
    } catch (error) {
      setLoadErrorState(error.message);
    }
  };

  // Handlers for inverter sizing inputs
  const handleChangeInverterInput = (event) => {
    const { name, value } = event.target;
    setInverterInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Function to handle inverter sizing calculation
  const handleInverterSizing = async () => {
    try {
      await calculateInverterSizing(inverterInput);
    } catch (error) {
      setInverterErrorState(error.message);
    }
  };

  // Handlers for panel sizing inputs
  const handleChangePanelInput = (event) => {
    const { name, value } = event.target;
    setPanelInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Function to handle panel sizing calculation
  const handlePanelSizing = async () => {
    try {
      await calculatePanelSizing(panelInput);
    } catch (error) {
      setPanelErrorState(error.message);
    }
  };

  return (
    <div>
      {/* Main container for the HomeScreen layout */}
      <Container className="my-5">
        <h1 className="text-center" style={{ color: 'white' }}>Solar PV System Sizing Calculator</h1>
        <Row>
          {/* Feature card for Load Analysis */}
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
          {/* Feature card for Panel Sizing */}
          <Col md={6} lg={4} className="my-3">
            <FeatureCard
              title="Panel Sizing"
              icon={<FaSolarPanel />}
              onClick={() => setShowPanelSizingModal(true)}
              isLoading={isPanelLoading}
              isError={isPanelError}
              error={panelError}
            />
          </Col>
          {/* Feature card for Inverter Sizing */}
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
          {/* Placeholder cards for Battery Sizing and Charge Controller Sizing */}
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
      {/* Footer component */}
      <Footer />

      {/* Modals for Load Analysis, Inverter Sizing, and Panel Sizing */}
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

      <PanelSizingModal
        show={showPanelSizingModal}
        onHide={() => setShowPanelSizingModal(false)}
        panelInput={panelInput}
        handleChangePanelInput={handleChangePanelInput}
        handlePanelSizing={handlePanelSizing}
        panelErrorState={panelErrorState}
        panelData={panelData}
      />
    </div>
  );
};

// Export the HomeScreen component for use in other parts of the application
export default HomeScreen;
