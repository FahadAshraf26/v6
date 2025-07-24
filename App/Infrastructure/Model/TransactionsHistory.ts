import { Model, Sequelize } from "sequelize";

interface TransactionsHistoryAttributes {
  transactionsHistoryId: string;
  cashFlowStatus: string | null;
  dwollaTransferId: string | null;
  campaignName: string | null;
  amount: number | null;
  transferStatus: string | null;
}

export class TransactionsHistory
  extends Model<TransactionsHistoryAttributes>
  implements TransactionsHistoryAttributes
{
  public transactionsHistoryId!: string;
  public cashFlowStatus!: string | null;
  public dwollaTransferId!: string | null;
  public campaignName!: string | null;
  public amount!: number | null;
  public transferStatus!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userTransactions",
      onDelete: "cascade",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  TransactionsHistory.init(
    {
      transactionsHistoryId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      cashFlowStatus: {
        type: DataTypes.STRING,
      },
      dwollaTransferId: {
        type: DataTypes.STRING,
      },
      campaignName: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      transferStatus: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "TransactionsHistory",
      tableName: "transactionsHistories",
      timestamps: true,
      paranoid: true,
    }
  );

  return TransactionsHistory;
};
