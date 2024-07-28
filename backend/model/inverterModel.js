import mongoose from 'mongoose';

const inverterSchema = mongoose.Schema({
  totalEnergyDemand: { type: Number, required: true },
  apparentPower: { type: Number, required: true },
  inverterEfficiency: { type: Number, required: true },
  inverterCapacity: { type: Number, required: true },
  inverterRunTime: { type: Number, required: true },
  adjustedEnergyDemand: { type: Number, required: true },
  consumerEnergyDemand: { type: Number, required: true }
}, {
  timestamps: true
});

const Inverter = mongoose.model('Inverter', inverterSchema);

export default Inverter;
