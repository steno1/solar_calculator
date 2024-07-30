// models/chargeControllerModel.js

import mongoose from 'mongoose';

const chargeControllerSchema = new mongoose.Schema(
  {
    numberOfPanelsInParallel: {
      type: Number,
      required: true,
    },
    isc: {
      type: Number,
      required: true,
    },
    Imax: {
      type: Number,
      required: true,
    },
    chargeControllerCapacity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChargeController = mongoose.model('ChargeController', chargeControllerSchema);

export default ChargeController;
