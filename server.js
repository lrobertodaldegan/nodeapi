const express = require("express");
var bcrypt = require("bcryptjs");
 
const app = express();
 
// parse requests of content-type - application/json
app.use(express.json({limit:'50mb'}));
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit:'50mb' }));
 
//start mongoose
const db = require("./app/models");
const App = db.app;

const dbConfig = require("./app/config/db.config");
 
db.mongoose
  .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
 
function initial() {
  //add something you want to do just on start
  /*
  let newApp = new App({
    name: 'appname',
    key: bcrypt.hashSync('some key', 8),
  });

  newApp.save()
  .then(a => console.log(`App ${a.name} adicionado com sucesso`))
  .catch(err => {console.log(err); console.log('Erro ao cadastrar app!');});
  */

  db.mongoose.connection.db.stats().then(stats => {
    console.log(stats);
  });
}
//end mongoose
//cors...
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,UserAgent,X-Requested-With,Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,POST');
  res.header('Access-Control-Allow-Credentials', true);
 
  next();
});
//log requests
// app.use((_req, res, next) => {
//  console.log(`Req: url: ${_req.url}, method: ${_req.method}, body: ${_req.body ? JSON.stringify(_req.body) : 'empty'}, query: ${_req.query ? JSON.stringify(_req.query) : 'empty'}, path:${_req.params ? JSON.stringify(_req.params) : 'empty'}, headers: ${JSON.stringify(_req.headers)}`);

//  next();
// });
 
// routes
require('./app/routes/generic.routes')(app);
//kepecas
require('./app/routes/kepecas/assets.routes')(app);
require('./app/routes/kepecas/auth.routes')(app);
require('./app/routes/kepecas/device.routes')(app);
require('./app/routes/kepecas/payment.routes')(app);
require('./app/routes/kepecas/services.routes')(app);
require('./app/routes/kepecas/user.routes')(app);
require('./app/routes/kepecas/usercar.routes')(app);


app.all('*', [], (req, res, next) => {
  return res.status(404).send({message: 'Nothing here...'});
})
 
// set port, listen for requests
const PORT = 21017;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}.`);
});