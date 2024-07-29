import mongoose from 'mongoose'; // Import mongoose

// Define the schema for the Inverter model
const inverterSchema = mongoose.Schema(
  {
    totalEnergyDemand: { type: Number, required: true }, // Total energy demand in Watt-hours
    apparentPower: { type: Number, required: true }, // Apparent power in Volt-amperes
    inverterEfficiency: { type: Number, required: true }, // Efficiency of the inverter in percentage
    inverterCapacity: { type: Number, required: true }, // Calculated inverter capacity
    inverterRunTime: { type: Number, required: true }, // Calculated run time of the inverter
    adjustedEnergyDemand: { type: Number, required: true }, // Adjusted energy demand considering inverter efficiency
    consumerEnergyDemand: { type: Number, required: true }, // Consumer's daily energy demand
  },
  {
    timestamps: true, // Add timestamps to track creation and update times
  }
);

// Create and export the Inverter model
const Inverter = mongoose.model('Inverter', inverterSchema);
export default Inverter;
