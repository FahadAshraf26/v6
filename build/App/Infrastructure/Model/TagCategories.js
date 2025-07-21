"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class TagCategory extends sequelize_1.Model {
        static associate(models) {
            this.hasMany(models.Tag, {
                foreignKey: "tagCategoryId",
                as: "tags",
            });
        }
    }
    TagCategory.init({
        tagCategoryId: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "TagCategory",
        tableName: "tagCategories",
        timestamps: true,
        paranoid: true,
    });
    return TagCategory;
};
