const express = require("express");
const Cors = require("cors");
const logger = require("./config/logger");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(Cors());

app.use("/", routes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`server started at port ${PORT}`);
    process.env.PROD === 'true' ? 
      logger.info('Simulating a production environment') :
      logger.info('Development environment')
  });

module.exports = app;