// Controller function to calculate charge controller sizing
export const calculateChargeControllerSizing = (req, res) => {
    // Destructure the necessary fields from the request body
    const { numberOfPanelsInParallel, isc } = req.body;
  
    // Check if all required fields are present in the request body
    if (numberOfPanelsInParallel === undefined || isc === undefined) {
      return res.status(400).json({ message: 'Both numberOfPanelsInParallel and isc are required' });
    }
  
    // Calculation logic with decimal precision
    // Calculate the maximum current (Imax) based on the number of panels and short circuit current
    const Imax = (numberOfPanelsInParallel * isc).toFixed(2);
    
    // Calculate the charge controller capacity using the formula provided
    const chargeControllerCapacity = ((Imax * 0.20) + Number(Imax)).toFixed(2);
  
    // Return the calculated values in the response
    res.status(200).json({ Imax, chargeControllerCapacity });
  };
  