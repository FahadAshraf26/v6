import { Model, Sequelize } from "sequelize";

interface InvestorPaymentsAttributes {
  investorPaymentsId: string;
  prorate: number | null;
}

export class InvestorPayments
  extends Model<InvestorPaymentsAttributes>
  implements InvestorPaymentsAttributes
{
  public investorPaymentsId!: string;
  public prorate!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.hasMany(models.ProjectionReturns, {
      foreignKey: "investorPaymentsId",
      as: "investorPaymentsProjections",
    });
    this.belongsTo(models.Investor, { foreignKey: "investorId" });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  InvestorPayments.init(
    {
      investorPaymentsId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      prorate: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "InvestorPayments",
      tableName: "investorPayments",
      timestamps: true,
      paranoid: true,
    }
  );

  return InvestorPayments;
};
