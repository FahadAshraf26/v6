"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class SiteBannerConfiguration extends sequelize_1.Model {
    }
    SiteBannerConfiguration.init({
        siteBannerConfigurationId: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        configuration: {
            type: sequelize_1.DataTypes.JSON,
        },
    }, {
        sequelize,
        modelName: "SiteBannerConfiguration",
        tableName: "siteBannerConfigurations",
        timestamps: true,
        paranoid: true,
    });
    return SiteBannerConfiguration;
};
