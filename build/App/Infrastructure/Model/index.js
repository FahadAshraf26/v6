"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysqlConnection_1 = __importDefault(require("../Database/mysqlConnection"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db = {
    sequelize: mysqlConnection_1.default,
    Sequelize: sequelize_1.Sequelize,
};
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== path_1.default.basename(__filename) &&
        (file.slice(-3) === ".js" || file.slice(-3) === ".ts"));
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(mysqlConnection_1.default, sequelize_1.DataTypes);
    console.log(model.name);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
exports.default = db;
