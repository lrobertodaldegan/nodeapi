const mongoose = require("mongoose");

const Ranking = mongoose.model(
  "Generic_Ranking",
  new mongoose.Schema({
    player: String,
    score: Number,
    game: String,
    app: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Generic_App'
    },
  })
);

module.exports = Ranking;