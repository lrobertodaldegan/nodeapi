const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.device = require("./device.model");
db.usercar = require("./usercar.model");
db.servicePartner = require("./servicePartner.model");
db.resetCode = require("./resetCode.model");
db.plan = require('./plan.model');
db.signature = require('./signature.model');

module.exports = db;