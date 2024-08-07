const db = require("../../models/kepecas");
const UserCar = db.usercar;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.userCars = (req, res) => {
  let filter = {
    path:'user',
    match: {_id: req.userId}
  }
  
  UserCar.find({}).populate(filter).exec().then(cars => {
    if(!cars || cars.length < 1){
      res.status(404).send({message:`0 devices found!`});
    } else {
      res.status(200).send(cars); 
    }
  }).catch(err => errorHandler(err, res));
}

exports.addCar = (req, res) => {

  if(req.body && req.body.placa && req.body.modelo 
              && req.body.marca && req.body.ano){

    const usercar = new UserCar({
      placa: req.body.placa,
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      user: req.userId
    });

    usercar.save().then(car => {
      res.status(201).send({message:`Car ${car.placa} created successfully!`})  
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message:'Mandatory data was not received!'})
  }
}