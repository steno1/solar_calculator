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

    // Total Power for each appliance
    const totalPower = quantity * power;

    // Apparent Power for each appliance
    const apparentPower = totalPower / powerFactor;

    // Energy Demand for each appliance
    const energyDemand = apparentPower * hoursOfUse;

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
