import { Model, Sequelize } from "sequelize";

interface DwollaPostTransactionsAttributes {
  dwollaPostTransactionId: string;
  source: string | null;
  destination: string | null;
  interestPaid: number | null;
  principalPaid: number | null;
  total: number | null;
  status: string | null;
  idempotencyId: string | null;
  dwollaTransferId: string | null;
  fileName: string | null;
  issuerId?: string;
  dwollaPreTransactionId?: string;
}

export class DwollaPostTransactions
  extends Model<DwollaPostTransactionsAttributes>
  implements DwollaPostTransactionsAttributes
{
  public dwollaPostTransactionId!: string;
  public source!: string | null;
  public destination!: string | null;
  public interestPaid!: number | null;
  public principalPaid!: number | null;
  public total!: number | null;
  public status!: string | null;
  public idempotencyId!: string | null;
  public dwollaTransferId!: string | null;
  public fileName!: string | null;

  public issuerId!: string;
  public dwollaPreTransactionId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });

    this.belongsTo(models.DwollaPreTransactions, {
      foreignKey: "dwollaPreTransactionId",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaPostTransactions.init(
    {
      dwollaPostTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      source: { type: DataTypes.STRING },
      destination: { type: DataTypes.STRING },
      interestPaid: { type: DataTypes.FLOAT },
      principalPaid: { type: DataTypes.FLOAT },
      total: { type: DataTypes.FLOAT },
      status: { type: DataTypes.STRING },
      idempotencyId: { type: DataTypes.STRING },
      dwollaTransferId: { type: DataTypes.STRING },
      fileName: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "DwollaPostTransactions",
      tableName: "dwollaPostTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaPostTransactions;
};
