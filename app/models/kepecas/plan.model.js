const mongoose = require("mongoose");

const Plan = mongoose.model(
  "Kepecas_Plan",
  new mongoose.Schema({
    code: String,
    title: String,
    value: Number,
  })
);

module.exports = Plan;