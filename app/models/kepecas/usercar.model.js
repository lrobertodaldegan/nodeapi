const mongoose = require("mongoose");

const UserCar = mongoose.model(
  "Kepecas_UserCar",
  new mongoose.Schema({
    id: String,
    placa: String,
    marca: String,
    modelo: String,
    ano: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Kepecas_User'
    }
  })
);

module.exports = UserCar;