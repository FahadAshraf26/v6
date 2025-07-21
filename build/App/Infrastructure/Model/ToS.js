"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Tos extends sequelize_1.Model {
    }
    Tos.init({
        tosId: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        termOfServicesUpdateDate: {
            type: sequelize_1.DataTypes.BOOLEAN,
        },
        privacyPolicyUpdateDate: {
            type: sequelize_1.DataTypes.BOOLEAN,
        },
        educationalMaterialUpdateDate: {
            type: sequelize_1.DataTypes.BOOLEAN,
        },
        faqsUpdateDate: {
            type: sequelize_1.DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: "Tos",
        tableName: "tos",
        timestamps: true,
        paranoid: true,
    });
    return Tos;
};
