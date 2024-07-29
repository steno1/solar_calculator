import '../styles.css';
import '../footerFix.css';
import 'react-toastify/dist/ReactToastify.css';

import { Col, Container, Row } from 'react-bootstrap';
import { FaBatteryHalf, FaBolt, FaChargingStation, FaCogs, FaSolarPanel } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

import BatterySizingModal from '../components/batteryModal.js';
import FeatureCard from '../components/FeatureCard.js';
import Footer from '../components/Footer';
import InverterSizingModal from '../components/InverterSizingModal.js';
import LoadAnalysisModal from '../components/LoadAnalysisModal.js';
import PanelSizingModal from '../components/panelSizingModal.js';
import { useCalculateBatterySizingMutation } from '../slices/batteryApiSlice'; // Import the battery sizing mutation hook
import { useCalculateInverterSizingMutation } from '../slices/inverterApiSlice';
import { useCalculateLoadAnalysisMutation } from '../slices/loadApiSlice';
import { useCalculatePanelSizingMutation } from '../slices/panelApiSlice';

const HomeScreen = () => {
  const [showLoadAnalysisModal, setShowLoadAnalysisModal] = useState(false);
  const [showInverterSizingModal, setShowInverterSizingModal] = useState(false);
  const [showPanelSizingModal, setShowPanelSizingModal] = useState(false);
  const [showBatterySizingModal, setShowBatterySizingModal] = useState(false);

  const [calculateLoadAnalysis, { data: loadData, isLoading: isLoadLoading, isError: isLoadError, error: loadError }] = useCalculateLoadAnalysisMutation();
  const [calculateInverterSizing, { data: inverterData, isLoading: isInverterLoading, isError: isInverterError, error: inverterError }] = useCalculateInverterSizingMutation();
  const [calculatePanelSizing, { data: panelData, isLoading: isPanelLoading, isError: isPanelError, error: panelError }] = useCalculatePanelSizingMutation();
  const [calculateBatterySizing, { data: batteryData, isLoading: isBatteryLoading, isError: isBatteryError, error: batteryError }] = useCalculateBatterySizingMutation();

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
  const [batteryInput, setBatteryInput] = useState({
    dailyEnergyDemand: 0,
    systemVoltage: 0,
    batteryVoltage: 0,
    batteryCapacityAh: 0,
    depthOfDischarge: 0
  });

  const [loadErrorState, setLoadErrorState] = useState(null);
  const [inverterErrorState, setInverterErrorState] = useState(null);
  const [panelErrorState, setPanelErrorState] = useState(null);
  const [batteryErrorState, setBatteryErrorState] = useState(null);

  useEffect(() => {
    if (showLoadAnalysisModal || showInverterSizingModal || showPanelSizingModal || showBatterySizingModal) {
      setLoadErrorState(null);
      setInverterErrorState(null);
      setPanelErrorState(null);
      setBatteryErrorState(null);
    }
  }, [showLoadAnalysisModal, showInverterSizingModal, showPanelSizingModal, showBatterySizingModal]);

  const handleChangeAppliance = (index, event) => {
    const { name, value } = event.target;
    const updatedAppliances = [...appliances];
    updatedAppliances[index][name] = value;
    setAppliances(updatedAppliances);
  };

  const handleAddAppliance = () => {
    setAppliances([...appliances, { name: '', quantity: 1, power: 0, powerFactor: 1, hoursOfUse: 1 }]);
  };

  const handleRemoveAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  const handleLoadAnalysis = async () => {
    try {
      await calculateLoadAnalysis({ appliances });
    } catch (error) {
      setLoadErrorState(error.message);
    }
  };

  const handleChangeInverterInput = (event) => {
    const { name, value } = event.target;
    setInverterInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleInverterSizing = async () => {
    try {
      await calculateInverterSizing(inverterInput);
    } catch (error) {
      setInverterErrorState(error.message);
    }
  };

  const handleChangePanelInput = (event) => {
    const { name, value } = event.target;
    setPanelInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handlePanelSizing = async () => {
    try {
      await calculatePanelSizing(panelInput);
    } catch (error) {
      setPanelErrorState(error.message);
    }
  };

  const handleChangeBatteryInput = (event) => {
    const { name, value } = event.target;
    setBatteryInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleBatterySizing = async () => {
    try {
      await calculateBatterySizing(batteryInput);
    } catch (error) {
      setBatteryErrorState(error.message);
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
              onClick={() => setShowPanelSizingModal(true)}
              isLoading={isPanelLoading}
              isError={isPanelError}
              error={panelError}
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
              onClick={() => setShowBatterySizingModal(true)}
              isLoading={isBatteryLoading}
              isError={isBatteryError}
              error={batteryError}
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

      <PanelSizingModal
        show={showPanelSizingModal}
        onHide={() => setShowPanelSizingModal(false)}
        panelInput={panelInput}
        handleChangePanelInput={handleChangePanelInput}
        handlePanelSizing={handlePanelSizing}
        panelErrorState={panelErrorState}
        panelData={panelData}
      />

      <BatterySizingModal
        show={showBatterySizingModal}
        onHide={() => setShowBatterySizingModal(false)}
        handleChangeBatteryInput={handleChangeBatteryInput} // Add this handler
        handleBatterySizing={handleBatterySizing}
        batteryErrorState={batteryErrorState}
        batteryData={batteryData}
      />
    </div>
  );
};

export default HomeScreen;
