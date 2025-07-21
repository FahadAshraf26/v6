"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("@infrastructure/Database/mysqlConnection");
const Config_1 = __importDefault(require("@infrastructure/Config"));
const commander_1 = __importDefault(require("commander"));
const Server_1 = __importDefault(require("../App/HTTP/Server"));
const logger_1 = __importDefault(require("@infrastructure/Logger/logger"));
const { server } = Config_1.default;
commander_1.default.command("start").action(() => {
    const httpServer = Server_1.default.listen(server.PORT, "0.0.0.0", () => {
        logger_1.default.info(`[HTTP]: ${server.APP_NAME} Listening on port ${server.PORT} `);
    });
    httpServer.keepAliveTimeout = 61 * 1000;
    httpServer.headersTimeout = 65 * 1000;
});
commander_1.default.parse(process.argv);
