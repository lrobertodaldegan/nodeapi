const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.app = require("./app.model");
db.ranking = require("./ranking.model");

module.exports = db;