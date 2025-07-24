import { Model, Sequelize } from "sequelize";

interface DwollaCustodyTransferHistoryAttributes {
  dwollaCustodyTransferHistoryId: string;
  source: string | null;
  destination: string | null;
  dwollaTransferId: string | null;
  businessOwnerName: string | null;
  businessOwnerEmail: string | null;
  amount: number | null;
  issuerId?: string;
}

export class DwollaCustodyTransferHistory
  extends Model<DwollaCustodyTransferHistoryAttributes>
  implements DwollaCustodyTransferHistoryAttributes
{
  public dwollaCustodyTransferHistoryId!: string;
  public source!: string | null;
  public destination!: string | null;
  public dwollaTransferId!: string | null;
  public businessOwnerName!: string | null;
  public businessOwnerEmail!: string | null;
  public amount!: number | null;

  public issuerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
      constraints: false,
    });

    this.hasMany(models.DwollaPostBankTransactions, {
      foreignKey: "dwollaCustodyTransferHistoryId",
      constraints: false,
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaCustodyTransferHistory.init(
    {
      dwollaCustodyTransferHistoryId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      source: { type: DataTypes.STRING },
      destination: { type: DataTypes.STRING },
      dwollaTransferId: { type: DataTypes.STRING },
      businessOwnerName: { type: DataTypes.STRING },
      businessOwnerEmail: { type: DataTypes.STRING },
      amount: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      modelName: "DwollaCustodyTransferHistory",
      tableName: "dwollaCustodyTransferHistories",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaCustodyTransferHistory;
};
