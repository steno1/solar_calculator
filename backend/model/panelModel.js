// Import mongoose to interact with MongoDB

import mongoose from 'mongoose';

// Define the schema for the Panel model
const panelSchema = mongoose.Schema({
  // Field for daily energy demand in kilowatt-hours (kWh)
  dailyEnergyDemand: { type: Number, required: true },

  // Field for panel efficiency as a percentage
  panelEfficiency: { type: Number, required: true },

  // Field for peak sun hours (the average number of hours of full sunlight per day)
  peakSunHours: { type: Number, required: true },

  // Field for the wattage of each solar panel
  panelWattage: { type: Number, required: true },

  // Field for the system voltage of the solar array
  systemVoltage: { type: Number, required: true },

  // Field for the voltage rating of each panel
  panelVoltRating: { type: Number, required: true },

  // Calculated field for total PV power required in watts
  totalPvPower: { type: Number, required: true },

  // Calculated field for the number of panels needed
  panelsNeeded: { type: Number, required: true },

  // Calculated field for the number of panels connected in series
  panelsInSeries: { type: Number, required: true },

  // Calculated field for the number of panels connected in parallel
  panelsInParallel: { type: Number, required: true }
}, {
  // Automatically add createdAt and updatedAt fields
  timestamps: true
});

// Create a Mongoose model using the defined schema
const Panel = mongoose.model('Panel', panelSchema);

// Export the Panel model for use in other parts of the application
export default Panel;
