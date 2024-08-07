const db = require("../../models/kepecas");
const User = db.user;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

checkSameUser = (user, res) => {
  if(req.userId && req.userId != null){
    User.findById(req.userId).exec().then(userById => {
      if(`${user._id}` === `${userById._id}`){
        next();
      } else {
        res.status(400).send({ message: "Email is already in use!" });
        return;
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({ message: "Failed! Email is already in use!" });
    return;
  }
}

checkDuplicateEmail = (req, res, next) => {
  if(req.body.email){
    User.findOne({
      email: req.body.email
    }).then((user) => {
      if (user) {
        checkSameUser(user, res);
      } else {
        next();
      }
    }).catch(err => errorHandler(err, res));
  } else {
    next();
  }
};

checkDuplicatedUsername = (req, res, next) => {
  if(req.body.email){
    User.findOne({
      login: req.body.login
    }).then((user) => {
      if (user) {
        checkSameUser(user, res);
      } else {
        next();
      }
    }).catch(err => errorHandler(err, res));
  } else {
    next();
  }
};

const verifyUser = {
  checkDuplicateEmail,
  checkDuplicatedUsername
};

module.exports = verifyUser;