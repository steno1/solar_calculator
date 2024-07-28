import Inverter from '../model/inverterModel.js';
import asyncHandler from 'express-async-handler';

// Calculate Inverter Sizing
const calculateInverterSizing = asyncHandler(async (req, res) => {
  const { totalEnergyDemand, apparentPower, inverterEfficiency } = req.body;

  if (!totalEnergyDemand || !apparentPower || !inverterEfficiency) {
    res.status(400);
    throw new Error('Total Energy Demand, Apparent Power, and Inverter Efficiency are required');
  }

  const efficiencyFactor = inverterEfficiency / 100;
  const safetyMargin = 1.2;

  // Calculate Inverter Capacity
  const inverterCapacity = (apparentPower * safetyMargin).toFixed(2);

  // Adjust Energy Demand for Inverter Efficiency
  const adjustedEnergyDemand = (totalEnergyDemand / efficiencyFactor).toFixed(2);

  // Calculate Inverter Run Time
  const inverterRunTime = (adjustedEnergyDemand / inverterCapacity).toFixed(2);

  // Consumer Energy Demand
  const consumerEnergyDemand = adjustedEnergyDemand; // Assuming the adjusted energy demand is what the consumer needs

  // Create a new Inverter document
  const inverter = await Inverter.create({
    totalEnergyDemand,
    apparentPower,
    inverterEfficiency,
    inverterCapacity,
    inverterRunTime,
    adjustedEnergyDemand,
    consumerEnergyDemand
  });

  res.status(201).json({
   
    inverterCapacity,
    inverterRunTime,
    consumerEnergyDemand
  });
});

export { calculateInverterSizing };
