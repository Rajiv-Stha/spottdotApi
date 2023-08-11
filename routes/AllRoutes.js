module.exports = function (app) {
  app.use("/api/chat", require("./chatRoute"));
  app.use("/api/message", require("./messageRoute"));
};
