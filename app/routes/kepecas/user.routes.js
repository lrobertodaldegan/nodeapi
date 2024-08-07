const { authJwt, verifyUser } = require("../../middlewares/kepecas");
const controller = require("../../controllers/kepecas/user.controller");

module.exports = function(app) {
  app.get(
    '/api/kepecas/user',
    [authJwt.verifyToken],
    controller.userInfo
  );

  app.put(
    "/api/kepecas/user",
    [
      authJwt.verifyToken, 
      verifyUser.checkDuplicateEmail,
      verifyUser.checkDuplicatedUsername
    ],
    controller.updateUser
  );

  app.post(
    "/api/kepecas/user/forgot",
    [],
    controller.sendResetPassword
  );

  app.post(
    "/api/kepecas/user/code",
    [],
    controller.codeValidation
  );
};