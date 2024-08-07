const controller = require("../../controllers/kepecas/assets.controller");

module.exports = function(app) {
  app.post(
    '/api/kepecas/assets/servicepartner/logo/:partnerId',
    [],
    controller.servicePartnersLogo
  );
};