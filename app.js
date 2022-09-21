const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes");

const createApp = () => {
  const app = express();
  app.use(logger("combined"), cors(), express.json(), routes);
  app.use('/file', express.static('uploads'));

  return app;
};

module.exports = { createApp };
