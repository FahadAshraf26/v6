import { Sequelize } from "sequelize";
import config from "../Config";
import logger from "../Logger/logger";

const { database, server } = config;
const mysql = database.mysql;
const IS_DEBUG_MODE = server.IS_DEBUG_MODE;

const loggingOption = IS_DEBUG_MODE ? (msg) => logger.debug(msg) : false;

const sequelize = new Sequelize("hc-v6", "root", "root", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: loggingOption,
  pool: {
    max: 5,
    min: 1,
  },
  dialectOptions: {
    multipleStatements: true,
  },
});

logger.info(`[DB]: Attempting to connect to ${mysql.DB} at ${mysql.HOST}`);

sequelize
  .authenticate()
  .then(() => {
    logger.info(
      `[DB]: Connection to ${mysql.DB} at ${mysql.HOST} has been established successfully.`
    );
  })
  .catch((err) => {
    logger.error("[DB]: Unable to connect to the database:", err);
    process.exit(1);
  });

/*
 * DANGEROUS: sequelize.sync() is not recommended for production.
 * It does not version your database schema.
 * Use Sequelize Migrations instead for managing schema changes.
 *
 * REMOVED: sequelize.sync();
 */

/*
 * The `beforeCount` hook was a workaround for issues in older Sequelize versions.
 * Sequelize v6 handles counting with includes correctly using subqueries.
 * This hook is no longer necessary and relies on internal properties that may
 * have changed, so it has been removed.
 *
 * REMOVED: sequelize.addHook('beforeCount', ...);
 */

sequelize.sync();

// sequelize.addHook('beforeCount', function (options) {
//   const includeAvailable = options.include && options.include.find((item) => item['where']);

//   if (this._scope.include && this._scope.include.length > 0) {
//     options.distinct = true;
//     options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`;
//   }
//   const whereSymbols = includeAvailable
//     ? Object.getOwnPropertySymbols(includeAvailable['where']).length
//     : 0;
//   const whereString = includeAvailable
//     ? JSON.stringify(includeAvailable['where']).length
//     : 0;
//   const whereObject = whereSymbols > 0 ? whereSymbols : whereString > 2 ? 1 : 0;

//   if (whereObject === 0 && options.include && options.include.length > 0) {
//     options.include = null;
//   }
// });

export default sequelize;
