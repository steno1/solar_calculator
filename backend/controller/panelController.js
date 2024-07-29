// controllers/panelController.js

// Define the async function to calculate panel sizing
export const calculatePanelSizing = async (req, res) => {
  // Destructure the input values from the request body
  const { dailyEnergyDemand, panelEfficiency, peakSunHours, panelWattage, systemVoltage, panelVoltRating } = req.body;

  // Check if all required fields are provided
  if (!dailyEnergyDemand || !panelEfficiency || !peakSunHours || !panelWattage || !systemVoltage || !panelVoltRating) {
    // Respond with a 400 Bad Request status and an error message if any field is missing
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Calculate the total PV power required (daily energy demand divided by the product of panel efficiency and peak sun hours)
    const totalPvPower = (dailyEnergyDemand / (panelEfficiency * peakSunHours)).toFixed(2);

    // Calculate the number of panels required (rounding up the result of total PV power divided by panel wattage)
    const numberOfPanels = Math.ceil(totalPvPower / panelWattage);

    // Calculate the number of panels needed in series (rounding up the result of system voltage divided by panel voltage rating)
    const connectionsInSeries = Math.ceil(systemVoltage / panelVoltRating);

    // Calculate the number of panels needed in parallel (rounding up the result of number of panels divided by connections in series)
    const connectionsInParallel = Math.ceil(numberOfPanels / connectionsInSeries);

    // Respond with a 200 OK status and the calculated values
    res.status(200).json({
      totalPvPower: `${totalPvPower}`,
      numberOfPanels,
      connectionsInSeries,
      connectionsInParallel,
    });
  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Respond with a 500 Internal Server Error status and an error message if an exception occurs
    res.status(500).json({ message: 'Server error' });
  }
};
