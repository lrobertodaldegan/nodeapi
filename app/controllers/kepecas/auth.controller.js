const config = require("../../config/kepecas/auth.config");
const db = require("../../models/kepecas");
const User = db.user;
const Device = db.device;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.signUp = (req, res) => {
  if(req.body && req.body.name && req.body.login && req.body.password) {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
    });
  
    user.save().then(user => {
      let successMsg = { message: `User ${user.name} was registered successfully!` };

      if(req.body.device){
        const device = new Device({
          deviceId: req.body.device.id,
          uniqueId: req.body.device.uniqueId,
          user: user._id
        });

        device.save().then(device => res.status(201).send(successMsg))
                      .catch(err => errorHandler(err, res));
      } else {
        res.status(201).send(successMsg);
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({ message: `Mandatory data was not received!` });
  }
};

exports.signin = (req, res) => {
  User.findOne({login: req.body.login}).exec()
      .then(user => {
        if (!user)
          return res.status(404).send({ message: "User Not found." });

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid)
          return res.status(401).send({ message: "Invalid Password!" });

        const token = jwt.sign({ id: user._id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 5184000,//60 days
                                });

        res.status(200).send({
          id: user._id,
          token: token
        });
    }).catch(err => errorHandler(err, res));
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};