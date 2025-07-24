import { Model, Sequelize } from "sequelize";

interface InvestorPaymentOptionAttributes {
  investorPaymentOptionsId: string;
  type: string;
  investorId?: string;
}

export class InvestorPaymentOption
  extends Model<InvestorPaymentOptionAttributes>
  implements InvestorPaymentOptionAttributes
{
  public investorPaymentOptionsId!: string;
  public type!: string;

  public investorId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.hasOne(models.InvestorCard, {
      foreignKey: "investorPaymentOptionsId",
      as: "card",
    });
    this.hasOne(models.InvestorBank, {
      foreignKey: "investorPaymentOptionsId",
      as: "bank",
    });

    this.belongsTo(models.Investor, {
      foreignKey: "investorId",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  InvestorPaymentOption.init(
    {
      investorPaymentOptionsId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "InvestorPaymentOption",
      tableName: "investorPaymentOptions",
      timestamps: true,
      paranoid: true,
    }
  );

  return InvestorPaymentOption;
};
