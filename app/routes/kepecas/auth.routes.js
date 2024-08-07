const { verifyUser } = require("../../middlewares/kepecas");
const controller = require("../../controllers/kepecas/auth.controller");

module.exports = function(app) {
  app.post(
    "/api/kepecas/auth/signup",
    [
      verifyUser.checkDuplicateEmail,
      verifyUser.checkDuplicatedUsername
    ],
    controller.signUp
  );

  app.post("/api/kepecas/auth/signin", controller.signin);
  app.post("/api/kepecas/auth/signout", controller.signout);
};