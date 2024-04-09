const mongoose = require("mongoose");

const App = mongoose.model(
  "Generic_App",
  new mongoose.Schema({
    name: String,
    key: String,
  })
);

module.exports = App;