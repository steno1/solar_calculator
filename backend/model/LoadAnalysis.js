import mongoose from 'mongoose';

const loadAnalysisSchema = mongoose.Schema({
  appliances: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    power: { type: Number, required: true },
    powerFactor: { type: Number, required: true },
    hoursOfUse: { type: Number, required: true }
  }],
  totalApparentPower: { type: Number, required: true },
  totalEnergyDemand: { type: Number, required: true }
}, {
  timestamps: true
});

const LoadAnalysis = mongoose.model('LoadAnalysis', loadAnalysisSchema);

export default LoadAnalysis;
