const { verify } = require("../middlewares");
const controller = require("../controllers/ranking.controller");

module.exports = function(app) {
  app.get(
    "/api/:app/ranking",
    [
      verify.verifyAppName,
      verify.verifyAppKey,
    ],
    controller.list
  );

  app.post(
    "/api/:app/ranking",
    [
      verify.verifyAppName,
      verify.verifyAppKey,
    ],
    controller.add
  );

  app.delete(
    "/api/:app/ranking/:id",
    [
      verify.verifyAppName,
      verify.verifyAppKey,
      verify.verifyId,
    ],
    controller.remove
  );
};