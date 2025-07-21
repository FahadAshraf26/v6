"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class AdminRole extends sequelize_1.Model {
    }
    AdminRole.init({
        adminRoleId: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "AdminRole",
        tableName: "adminRoles",
        timestamps: true,
    });
    return AdminRole;
};
