const mongoose = require("mongoose");

const User = mongoose.model(
  "Kepecas_User",
  new mongoose.Schema({
    name: String,
    login:String,
    email: String,
    password: String,
    phone: String,
    signature: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Kepecas_Signature'
    }
  })
);

module.exports = User;