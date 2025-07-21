import dotenv from "dotenv";
dotenv.config();
import "@infrastructure/Database/mysqlConnection";
import "@infrastructure/Model";
import config from "@infrastructure/Config";
import program from "commander";
import app from "../App/HTTP/Server";
import logger from "@infrastructure/Logger/logger";
const { server } = config;

// if (server.IS_PRODUCTION) {
// }

program.command("start").action(() => {
  const httpServer = app.listen(server.PORT, "0.0.0.0", () => {
    logger.info(`[HTTP]: ${server.APP_NAME} Listening on port ${server.PORT} `);
  });

  httpServer.keepAliveTimeout = 61 * 1000;
  httpServer.headersTimeout = 65 * 1000;
});

program.parse(process.argv);
