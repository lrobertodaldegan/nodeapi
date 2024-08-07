const mongoose = require("mongoose");

const Signature = mongoose.model(
  "Kepecas_Signature",
  new mongoose.Schema({
    code: String,
    plan: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Kepecas_Plan'
    }
  })
);

module.exports = Signature;