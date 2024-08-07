const { authJwt } = require("../../middlewares/kepecas");
const controller = require("../../controllers/kepecas/usercar.controller");

module.exports = function(app) {
  app.get(
    '/api/kepecas/usercars',
    [authJwt.verifyToken],
    controller.userCars
  );

  app.post(
    '/api/kepecas/usercar',
    [authJwt.verifyToken],
    controller.addCar
  );
};