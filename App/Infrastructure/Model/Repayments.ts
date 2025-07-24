import { Model, Sequelize } from "sequelize";
interface RepaymentAttributes {
  repaymentId: string;
  interest: number | null;
  principle: number | null;
  status: string | null;
  paymentType: string | null;
  total: number | null;
  accountName: string | null;
  importedAt: Date | null;
  dwollaTransferId: string | null;
  uploadId: string | null;
  investorId?: string;
  campaignId?: string;
}

export class Repayment
  extends Model<RepaymentAttributes>
  implements RepaymentAttributes
{
  public repaymentId!: string;
  public interest!: number | null;
  public principle!: number | null;
  public status!: string | null;
  public paymentType!: string | null;
  public total!: number | null;
  public accountName!: string | null;
  public importedAt!: Date | null;
  public dwollaTransferId!: string | null;
  public uploadId!: string | null;

  public investorId!: string;
  public campaignId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Investor, {
      foreignKey: "investorId",
      as: "investorRepayment",
    });

    this.belongsTo(models.Campaign, {
      foreignKey: "campaignId",
      as: "campaignRepayment",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Repayment.init(
    {
      repaymentId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      interest: {
        type: DataTypes.FLOAT,
      },
      principle: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.STRING,
      },
      paymentType: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.FLOAT,
      },
      accountName: {
        type: DataTypes.STRING,
      },
      importedAt: {
        type: DataTypes.DATE,
      },
      dwollaTransferId: {
        type: DataTypes.STRING,
      },
      uploadId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Repayment",
      tableName: "repayments",
      timestamps: true,
      paranoid: true,
    }
  );

  return Repayment;
};
