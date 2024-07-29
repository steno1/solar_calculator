import LoadAnalysis from '../model/loadAnalysis.js';
import asyncHandler from 'express-async-handler';

// Calculate Load Analysis
const calculateLoadAnalysis = asyncHandler(async (req, res) => {
  const { appliances } = req.body; // Expecting an array of appliances

  if (!appliances || !Array.isArray(appliances)) {
    res.status(400);
    throw new Error('Appliances data is required');
  }

  let totalApparentPower = 0;
  let totalEnergyDemand = 0;

  appliances.forEach(appliance => {
    const { quantity, power, powerFactor, hoursOfUse } = appliance;

    // Ensure no division by zero and valid numbers
    const validPowerFactor = powerFactor !== 0 ? powerFactor : 1; // Avoid division by zero
    const validPower = Number(power) || 0; // Default to 0 if power is invalid
    const validQuantity = Number(quantity) || 0; // Default to 0 if quantity is invalid
    const validHoursOfUse = Number(hoursOfUse) || 0; // Default to 0 if hoursOfUse is invalid

    // Total Power for each appliance
    const totalPower = validQuantity * validPower;

    // Apparent Power for each appliance
    const apparentPower = validPowerFactor !== 0 ? totalPower / validPowerFactor : 0;

    // Energy Demand for each appliance
    const energyDemand = apparentPower * validHoursOfUse;

    totalApparentPower += apparentPower;
    totalEnergyDemand += energyDemand;
  });

  // Format to two decimal places
  totalApparentPower = totalApparentPower.toFixed(2);
  totalEnergyDemand = totalEnergyDemand.toFixed(2);

  // Create a new LoadAnalysis document
  const loadAnalysis = await LoadAnalysis.create({
    appliances,
    totalApparentPower,
    totalEnergyDemand
  });

  res.status(201).json({
    totalApparentPower,
    totalEnergyDemand
  });
});

export { calculateLoadAnalysis };
