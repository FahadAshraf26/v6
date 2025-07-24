import { Model, Sequelize } from "sequelize";

interface PromotionTextAttributes {
  promotionTextId: string;
  configuration: any | null;
}

export class PromotionText
  extends Model<PromotionTextAttributes>
  implements PromotionTextAttributes
{
  public promotionTextId!: string;
  public configuration!: any | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  PromotionText.init(
    {
      promotionTextId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      configuration: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "PromotionText",
      tableName: "promotionTexts",
      timestamps: true,
      paranoid: true,
    }
  );

  return PromotionText;
};
