export const calculateBatterySizing = (req, res) => {
    const { dailyEnergyDemand, systemVoltage, batteryVoltage, batteryCapacityAh, depthOfDischarge } = req.body;
  
    if (!dailyEnergyDemand || !systemVoltage || !batteryVoltage || !batteryCapacityAh || !depthOfDischarge) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Calculation logic with decimal precision
    const batteryBankCapacity = (dailyEnergyDemand / systemVoltage).toFixed(2);
    const numberOfBatteriesInParallel = (batteryBankCapacity / (batteryCapacityAh * depthOfDischarge)).toFixed(2);
    const numberOfBatteriesInSeries = (systemVoltage / batteryVoltage).toFixed(2);
    const totalNumberOfBatteries = (numberOfBatteriesInParallel * numberOfBatteriesInSeries).toFixed(2);
  
    res.status(200).json({ batteryBankCapacity, numberOfBatteriesInParallel, numberOfBatteriesInSeries, totalNumberOfBatteries });
  };
  