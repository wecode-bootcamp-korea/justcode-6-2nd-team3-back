const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes");

const createApp = () => {
  const app = express();
  app.use(logger("combined"), cors(), express.json(), routes);

  return app;
};

module.exports = { createApp };
