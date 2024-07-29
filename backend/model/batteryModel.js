import mongoose from 'mongoose';

// Define the schema for the Battery model
const batterySchema = new mongoose.Schema({
  dailyEnergyDemand: { type: Number, required: true }, // Daily energy demand in Wh
  systemVoltage: { type: Number, required: true }, // System voltage in V
  batteryAh: { type: Number, required: true }, // Battery capacity in Ah
  depthOfDischarge: { type: Number, required: true }, // Depth of discharge in percentage
  batteryVoltage: { type: Number, required: true }, // Battery voltage in V
});

// Create the Battery model using the schema
const Battery = mongoose.model('Battery', batterySchema);

export default Battery; // Export the Battery model
