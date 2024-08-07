const mongoose = require("mongoose");

const ServicePartner = mongoose.model(
  "Kepecas_ServicePartner",
  new mongoose.Schema({
    name: String,
    address: String,
    zipcode: String,
    nbh: String,
    phone: String,
    cat: String,
    catDetail: String,
    coordinates: String,
    mapAddr: String,
  })
);

module.exports = ServicePartner;