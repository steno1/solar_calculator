import Inverter from '../model/inverterModel.js'; // Import the Inverter model from the model folder
import asyncHandler from 'express-async-handler'; // Import asyncHandler to handle asynchronous operations

// Calculate Inverter Sizing
const calculateInverterSizing = asyncHandler(async (req, res) => {
  // Destructure and convert inputs to numbers
  const { totalEnergyDemand, apparentPower, inverterEfficiency } = req.body;

  // Ensure all inputs are provided and convert them to numbers
  if (totalEnergyDemand === undefined || apparentPower === undefined || inverterEfficiency === undefined) {
    res.status(400);
    throw new Error('Total Energy Demand, Apparent Power, and Inverter Efficiency are required');
  }

  const totalEnergyDemandNum = parseFloat(totalEnergyDemand);
  const apparentPowerNum = parseFloat(apparentPower);
  const inverterEfficiencyNum = parseFloat(inverterEfficiency);

  // Check if conversion to numbers was successful
  if (isNaN(totalEnergyDemandNum) || isNaN(apparentPowerNum) || isNaN(inverterEfficiencyNum)) {
    res.status(400);
    throw new Error('Invalid input values');
  }

  const efficiencyFactor = inverterEfficiencyNum / 100; // Calculate the efficiency factor
  const safetyMargin = 1.2; // Define a safety margin for the calculations

  // Calculate Inverter Capacity
  const inverterCapacity = (apparentPowerNum * safetyMargin).toFixed(2);

  // Calculate Inverter Run Time
  const inverterRunTime = (totalEnergyDemandNum / apparentPowerNum).toFixed(2);

  // Calculate Inverter Standby
  const inverterStandby = (inverterCapacity * 0.01 * inverterRunTime).toFixed(2);

  // Calculate Adjusted Energy Demand considering inverter efficiency
  const adjustedEnergyDemand = (totalEnergyDemandNum / efficiencyFactor).toFixed(2);

  // Calculate Consumer Daily Energy Demand
  const consumerEnergyDemand = (parseFloat(adjustedEnergyDemand) + parseFloat(inverterStandby)).toFixed(2);

  // Create a new Inverter document
  const inverter = await Inverter.create({
    totalEnergyDemand: totalEnergyDemandNum,
    apparentPower: apparentPowerNum,
    inverterEfficiency: inverterEfficiencyNum,
    inverterCapacity,
    inverterRunTime,
    consumerEnergyDemand,
    inverterStandby,
    adjustedEnergyDemand,
  });

  // Respond with the calculated values
  res.status(201).json({
    inverterCapacity,
    inverterRunTime,
    consumerEnergyDemand,
    inverterStandby,
    adjustedEnergyDemand,
  });
});

export { calculateInverterSizing }; // Export the function
