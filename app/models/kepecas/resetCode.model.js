const mongoose = require("mongoose");

const ResetCode = mongoose.model(
  "Kepecas_ResetCode",
  new mongoose.Schema({
    code: Number,
    used: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Kepecas_User'
    }
  })
);

module.exports = ResetCode;