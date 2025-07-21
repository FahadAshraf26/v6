"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Tag extends sequelize_1.Model {
        static associate(models) {
            Tag.belongsTo(models.TagCategory, {
                foreignKey: "tagCategoryId",
                as: "category",
            });
        }
    }
    Tag.init({
        tagId: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        tag: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        tagCategoryId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            references: {
                model: "tagCategories",
                key: "tagCategoryId",
            },
        },
    }, {
        sequelize,
        modelName: "Tag",
        tableName: "tags",
        timestamps: true,
        paranoid: true,
    });
    return Tag;
};
