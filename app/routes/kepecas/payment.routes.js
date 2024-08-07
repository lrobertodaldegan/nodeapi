const controller = require("../../controllers/kepecas/payment.controller");

module.exports = function(app) {
  app.post(
    '/api/kepecas/pay',
    [],
    controller.sendPayment
  );

  app.post(
    '/api/kepecas/plan',
    [],
    controller.createPlan
  );

  app.get(
    '/api/kepecas/signatures',
    [],
    controller.getSignatures
  );

  app.delete(
    '/api/kepecas/signature/:id',
    [],
    controller.cancelSignature
  );

  app.post(
    '/api/kepecas/signature',
    [],
    controller.sign
  );
};