const { authJwt } = require("../../middlewares/kepecas");
const controller = require("../../controllers/kepecas/device.controller");

module.exports = function(app) {
  app.get(
    '/api/kepecas/user/devices',
    [authJwt.verifyToken],
    controller.userDevices
  );

  app.post(
    '/api/kepecas/user/device',
    [authJwt.verifyToken],
    controller.deviceValidation
  );
};