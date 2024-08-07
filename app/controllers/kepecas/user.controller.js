var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
const config = require("../../config/kepecas/auth.config");
const db = require("../../models/kepecas");
const User = db.user;
const Device = db.device;
const ResetCode = db.resetCode;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.userInfo = (req, res) => {
  User.findById(req.userId).exec()
      .then(user => {
        if(!user){
          res.status(404).send({ message: "User Not found." });
        } else {
          res.status(200).send({
            id: user._id,
            name: user.name,
            login: user.login,
            email: user.email,
            phone: user.phone,
          });
        }
      })
      .catch(err => errorHandler(err, res));
}

exports.updateUser = (req, res) => {
  User.findById(req.userId).exec()
      .then(user => {
        if (!user){
          res.status(404).send({ message: "User Not found." });
        } else {
          if(req.body.password && req.body.password != null)
            user.password = bcrypt.hashSync(req.body.password, 8);

          if(req.body.name && req.body.name != null)
            user.name = req.body.name;

          if(req.body.email && req.body.email != null)
            user.email = req.body.email;

          if(req.body.phone && req.body.phone != null)
            user.phone = req.body.phone;

          user.save().then(user => {
            res.status(200).send({ message: `User ${user.name} updated!` });
          }).catch(err => errorHandler(err, res));
        }
      })
      .catch(err => errorHandler(err, res));
}

exports.userDevices = (req, res) => {
  let filter = {
    path:'user',
    match: {_id: req.userId}
  }
  
  Device.find({}).populate(filter).exec().then(devices => {
    if(!devices || devices.length < 1){
      res.status(404).send({message:`0 devices found!`});
    } else {
      res.status(200).send(devices); 
    }
  }).catch(err => errorHandler(err, res));
}

exports.sendResetPassword = (req, res) => {
  if(req.body.email){
    User.find({email:req.body.email}).findOne().then(user => {
      if(!user){
        res.status(404).send({message:"User not found!"});
      } else {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'lukacomk73@gmail.com',
            pass: 'senha'
          }
        });

        const rc = new ResetCode({
          code: Math.round(Math.random() * 100000),
          user: user
        });

        rc.save().then(resetCode => {
          var mailOptions = {
            from: 'contato@kepecas.com.br',
            to: req.body.email,
            subject: 'Código de segurança',
            text: `Informe este código diretamente no aplicativo para realizar a troca de senha: ${rc.code}!`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error)
              console.log(error);
            else
              console.log('Email sent: ' + info.response);

            res.status(200).send({ message: "E-mail sent!" });
          });
        }).catch(err => errorHandler(err, res));
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Mandatory data was not sent!"});
  }
}

exports.codeValidation = (req, res) => {
  if(req.body.code && req.body.code > 0){
    ResetCode.findOne({code:req.body.code}).populate('user').then(resetCode => {
      if(!resetCode){
        res.status(400).send({message:'Invalid code!'});
      } else {
        if(resetCode.used === true){
          res.status(400).send({message:'Used code!'});
        } else {
          let userId = resetCode.user._id;

          ResetCode.deleteOne({_id:userId})
          .catch(err => console.log('Não foi possível remover o código de reset de senha'));

          const token = jwt.sign({ id: userId },
                                    config.secret,
                                    {
                                      algorithm: 'HS256',
                                      allowInsecureKeySizes: true,
                                      expiresIn: 5184000,//60 days
                                    });
          res.status(200).send({
            id: userId,
            token: token
          });
        }
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message:"Code is mandatory!"});
  }
}