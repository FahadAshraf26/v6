import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface DwollaPostBankTransactionsAttributes {
  dwollaPostBankTransactionId: string;
  source: string | null;
  destination: string | null;
  status: string | null;
  idempotencyId: string | null;
  dwollaTransferId: string | null;
  businessOwnerName: string | null;
  businessOwnerEmail: string | null;
  amount: number | null;
  issuerId?: string;
  dwollaPreBankTransactionId?: string;
  dwollaCustodyTransferHistoryId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaPostBankTransactions
  extends Model<DwollaPostBankTransactionsAttributes>
  implements DwollaPostBankTransactionsAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public dwollaPostBankTransactionId!: string;
  public source!: string | null;
  public destination!: string | null;
  public status!: string | null;
  public idempotencyId!: string | null;
  public dwollaTransferId!: string | null;
  public businessOwnerName!: string | null;
  public businessOwnerEmail!: string | null;
  public amount!: number | null;

  // Foreign Keys
  public issuerId!: string;
  public dwollaPreBankTransactionId!: string;
  public dwollaCustodyTransferHistoryId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });

    this.belongsTo(models.DwollaPreBankTransactions, {
      foreignKey: "dwollaPreBankTransactionId",
    });

    this.belongsTo(models.DwollaCustodyTransferHistory, {
      foreignKey: "dwollaCustodyTransferHistoryId",
      constraints: false,
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaPostBankTransactions.init(
    {
      // --- RUNTIME DEFINITIONS ---
      dwollaPostBankTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      source: { type: DataTypes.STRING },
      destination: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      idempotencyId: { type: DataTypes.STRING },
      dwollaTransferId: { type: DataTypes.STRING },
      businessOwnerName: { type: DataTypes.STRING },
      businessOwnerEmail: { type: DataTypes.STRING },
      amount: { type: DataTypes.FLOAT },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "DwollaPostBankTransactions",
      tableName: "dwollaPostBankTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaPostBankTransactions;
};
