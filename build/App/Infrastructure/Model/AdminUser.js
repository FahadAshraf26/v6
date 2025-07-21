"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class AdminUser extends sequelize_1.Model {
        static associate(models) {
            this.belongsTo(models.AdminRole, {
                foreignKey: "adminRoleId",
                as: "role",
                onDelete: "cascade",
            });
        }
    }
    AdminUser.init({
        adminUserId: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "AdminUser",
        tableName: "adminUsers",
        timestamps: true,
    });
    return AdminUser;
};
