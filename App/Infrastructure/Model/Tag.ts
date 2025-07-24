import { Model, Sequelize } from "sequelize";

interface TagAttributes {
  tagId: string;
  tag: string;
}

export class Tag extends Model<TagAttributes> implements TagAttributes {
  public tagId!: string;
  public tag!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.hasMany(models.UserTagPreferenceModel, {
      foreignKey: "tagId",
      as: "tagPreferences",
    });

    this.belongsTo(models.TagCategory, {
      foreignKey: "tagCategoryId",
      as: "category",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Tag.init(
    {
      tagId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tags",
      timestamps: true,
      paranoid: true,
    }
  );

  return Tag;
};
