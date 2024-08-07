const db = require("../../models/kepecas");
const ServicePartner = db.servicePartner;
const GeoDistance = require('node-geo-distance');
const assetsController = require('./assets.controller');

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.calcDistance = (req, res) => {
  try{
    if(req.body && req.body.coords && req.body.coords.length > 1){
      //medir distancia (em linha reta) dos endereços
      GeoDistance.haversine(req.body.coords[0], req.body.coords[1], 
                            (result) => res.status(200).send(result));
    } else {
      res.status(400).send({message:'Mandatory data was not received!'})
    }
  }catch(err){
    errorHandler(err, res);
  }
}

exports.getPartner = (req, res) => {
  if(req.query && req.query.partnerId){
    ServicePartner.findById(req.query.partnerId)
    .then((sp) => {
      if(sp){
        sp.logo = assetsController.partnerLogoToBase64(sp._id ? sp._id : sp.id);

        res.status(200).send(sp);
      } else {
        res.status(404).send({message:`Partner not found!`});
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message:'Mandatory data was not received!'})
  }
}

exports.getAllPartners = (req, res) => {
  ServicePartner.find()
  .then((sps) => {
    if(sps){
      let result = [];

      sps.map(sp => {
        let p = {...sp._doc};

        let logo = assetsController.partnerLogoToBase64(sp._id ? sp._id : sp.id);

        p.logo = logo != null 
                          ? `data:image/png;base64,${logo}`
                          : null
        result.push(p);
      });

      res.status(200).send(result);
    } else {
      res.status(204).send({message:`We have no partners!`});
    }
  }).catch(err => errorHandler(err, res));
}