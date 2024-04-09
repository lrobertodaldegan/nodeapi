const config = require("../config/auth.config");
const db = require("../models");
const Ranking = db.ranking;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.list = (req, res) => {
  Ranking.find({
    app:req.appId
  })
  .populate('app')
  .then(itens => {
    if(itens && itens !== null){
      let result = itens.sort(a, b => a.score > b.score);

      res.status(200).send({app: req.appName, ranking: result});
    } else {
      res.status(204).send({app: req.appName, ranking: []});
    }
  }).catch(err => errorHandler(ess, res));
}

exports.add = (req, res) => {
  Ranking.findOne({
    app: req.appId,
    player: req.body.player,
    score: req.body.score
  })
  .then(r => {
    if(r)
      return res.status(200).send({message:'Operação realizada com sucesso!'});

    let rank = new Ranking({
      app: req.appId,
      player: req.body.player,
      score: req.body.score
    });

    rank.save().then(newRank => {
      res.status(200).send({message:'Operação realizada com sucesso!'});
    }).catch(err => errorHandler(ess, res));
  }).catch(err => errorHandler(ess, res));
}

exports.remove = (req, res) => {
  Ranking.deleteOne({
    _id:req.params.id
  }).then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'})
  }).catch(err => errorHandler(ess, res));
}