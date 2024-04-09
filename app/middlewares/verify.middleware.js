var bcrypt = require("bcryptjs");
let db = require('../models');
const App = db.app;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

verifyDt = (req, res, next) => {
  if(req.query.dt || req.body.dt)
    next();
  else
    return res.status(400).send({ message: "Informe uma data para realizar a operação!" });
}

verifyId = (req, res, next) => {
  if(req.query.id || req.body.id || req.params.id)
    next();
  else
    return res.status(400).send({ message: "Informe um identificador para realizar a operação!" });
}

verifyAppName = (req, res, next) => {
  if(req.query.app || req.body.app || req.params.app){
    req.appName = req.params.app;

    if(!req.appName || req.appName === null)
      req.appName = req.body.app;

    if(!req.appName || req.appName === null)
      req.appName = req.query.app;

    next();
  } else {
    return res.status(400).send({ message: "Informe um identificador de aplicativo para realizar a operação!" });
  }
}

verifyAppKey = (req, res, next) => {
  let key = req.get('app-key');

  if(!key || key === null)
    key = req.get('APP-KEY');

  if(!key || key === null)
    return res.status(400).send({ message: "Informe um identificador de aplicativo para realizar a operação!" });

  App.findOne({name:req.appName}).then(app => {
    if(!app || !bcrypt.compareSync(key, app.key))
      return res.status(403).send({ message: "Proibido!" });

    req.appId = app._id;

    next();
  }).catch(err => errorHandler(err, res));
}

module.exports = {
  verifyDt,
  verifyId,
  verifyAppName,
  verifyAppKey,
}