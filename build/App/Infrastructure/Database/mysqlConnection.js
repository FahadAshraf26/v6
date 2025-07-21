"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Config_1 = __importDefault(require("../Config"));
const logger_1 = __importDefault(require("../Logger/logger"));
const { database, server } = Config_1.default;
const mysql = database.mysql;
const IS_DEBUG_MODE = server.IS_DEBUG_MODE;
const loggingOption = IS_DEBUG_MODE ? (msg) => logger_1.default.debug(msg) : false;
const sequelize = new sequelize_1.Sequelize("hc-v6", "root", "root", {
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
logger_1.default.info(`[DB]: Attempting to connect to ${mysql.DB} at ${mysql.HOST}`);
sequelize
    .authenticate()
    .then(() => {
    logger_1.default.info(`[DB]: Connection to ${mysql.DB} at ${mysql.HOST} has been established successfully.`);
})
    .catch((err) => {
    logger_1.default.error("[DB]: Unable to connect to the database:", err);
    process.exit(1);
});
sequelize.sync();
exports.default = sequelize;
