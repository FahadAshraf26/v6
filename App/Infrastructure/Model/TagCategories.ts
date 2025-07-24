import { Model, Sequelize } from "sequelize";

interface TagCategoryAttributes {
  tagCategoryId: string;
  category: string;
}

export class TagCategory
  extends Model<TagCategoryAttributes>
  implements TagCategoryAttributes
{
  public tagCategoryId!: string;
  public category!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.hasMany(models.Tag, {
      foreignKey: "tagCategoryId",
      as: "tags",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  TagCategory.init(
    {
      tagCategoryId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TagCategory",
      tableName: "tagCategories",
      timestamps: true,
      paranoid: true,
    }
  );

  return TagCategory;
};
