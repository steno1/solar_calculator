// controllers/chargeControllerController.js

import ChargeController from "../model/chargeControllerModel.js";

export const calculateChargeControllerSizing = async (req, res) => {
  const { numberOfPanelsInParallel, isc } = req.body;

  // Log received request body
  console.log('Received request body:', req.body);

  // Validate required fields
  if (numberOfPanelsInParallel === undefined || isc === undefined) {
    console.error('Validation failed: Missing required fields', { numberOfPanelsInParallel, isc });
    return res.status(400).json({ message: 'Both numberOfPanelsInParallel and isc are required' });
  }

  // Validate data types
  if (typeof numberOfPanelsInParallel !== 'number' || typeof isc !== 'number') {
    console.error('Validation failed: Invalid data types', { numberOfPanelsInParallel, isc });
    return res.status(400).json({ message: 'Both numberOfPanelsInParallel and isc must be numbers' });
  }

  // Validate value constraints
  if (numberOfPanelsInParallel <= 0 || isc <= 0) {
    console.error('Validation failed: Values must be greater than zero', { numberOfPanelsInParallel, isc });
    return res.status(400).json({ message: 'Values must be greater than zero' });
  }

  try {
    // Calculation logic
    const Imax = Number((numberOfPanelsInParallel * isc).toFixed(2)); // Convert to Number
    const chargeControllerCapacity = Number(((Imax * 0.20) + Imax).toFixed(2)); // Convert to Number

    // Save the calculated data to the database
    const chargeController = new ChargeController({
      numberOfPanelsInParallel,
      isc,
      Imax,
      chargeControllerCapacity,
    });

    await chargeController.save();

    // Return the calculated values in the response
    res.status(200).json({
      Imax,
      chargeControllerCapacity,
    });
  } catch (error) {
    console.error('Server error:', error); // Log the full error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
};
