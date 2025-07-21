import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface DwollaPreBankTransactionsAttributes {
  dwollaPreBankTransactionId: string;
  uploadId: string | null;
  source: string | null;
  destination: string | null;
  issuerName: string | null;
  businessOwnerName: string | null;
  businessOwnerEmail: string | null;
  amount: number | null;
  status: string | null;
  errorMessage: string | null;
}

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaPreBankTransactions
  extends Model<DwollaPreBankTransactionsAttributes>
  implements DwollaPreBankTransactionsAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public dwollaPreBankTransactionId!: string;
  public uploadId!: string | null;
  public source!: string | null;
  public destination!: string | null;
  public issuerName!: string | null;
  public businessOwnerName!: string | null;
  public businessOwnerEmail!: string | null;
  public amount!: number | null;
  public status!: string | null;
  public errorMessage!: string | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaPreBankTransactions.init(
    {
      // --- RUNTIME DEFINITIONS ---
      dwollaPreBankTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      uploadId: { type: DataTypes.STRING },
      source: { type: DataTypes.STRING },
      destination: { type: DataTypes.STRING },
      issuerName: { type: DataTypes.STRING },
      businessOwnerName: { type: DataTypes.STRING },
      businessOwnerEmail: { type: DataTypes.STRING },
      amount: { type: DataTypes.FLOAT },
      status: { type: DataTypes.STRING },
      errorMessage: { type: DataTypes.STRING },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "DwollaPreBankTransactions",
      tableName: "dwollaPreBankTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaPreBankTransactions;
};
