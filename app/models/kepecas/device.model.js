const mongoose = require("mongoose");

const Device = mongoose.model(
  "Kepecas_Device",
  new mongoose.Schema({
    id: String,
    deviceId: String,
    uniqueId: String,
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Kepecas_User'
    }
  })
);

module.exports = Device;