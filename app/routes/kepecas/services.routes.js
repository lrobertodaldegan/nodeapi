const { authJwt } = require("../../middlewares/kepecas");
const controller = require("../../controllers/kepecas/service.controller");

module.exports = function(app) {
  app.post(
    '/api/kepecas/service/distance',
    [authJwt.verifyToken],
    controller.calcDistance
  );

  app.get(
    '/api/kepecas/service/partner',
    [authJwt.verifyToken],
    controller.getPartner
  );

  app.get(
    '/api/kepecas/service/partners',
    [authJwt.verifyToken],
    controller.getAllPartners
  );
};