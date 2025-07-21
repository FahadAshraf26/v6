import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface DwollaCustodyTransactionsAttributes {
  dwollaCustodyTransactionId: string;
  source: string | null;
  destination: string | null;
  notCompletedStatus: string | null;
  completedStatus: string | null;
  idempotencyId: string | null;
  dwollaTransferId: string | null;
  businessOwnerName: string | null;
  businessOwnerEmail: string | null;
  amount: number | null;
  isCompleted: boolean;
  failureCode: string | null;
  failureReason: string | null;
  issuerId?: string;
  dwollaPreBankTransactionId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaCustodyTransactions
  extends Model<DwollaCustodyTransactionsAttributes>
  implements DwollaCustodyTransactionsAttributes
{
  // --- TYPE DEFINITIONS ---
  public dwollaCustodyTransactionId!: string;
  public source!: string | null;
  public destination!: string | null;
  public notCompletedStatus!: string | null;
  public completedStatus!: string | null;
  public idempotencyId!: string | null;
  public dwollaTransferId!: string | null;
  public businessOwnerName!: string | null;
  public businessOwnerEmail!: string | null;
  public amount!: number | null;
  public isCompleted!: boolean;
  public failureCode!: string | null;
  public failureReason!: string | null;

  // Foreign Keys
  public issuerId!: string;
  public dwollaPreBankTransactionId!: string;

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
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaCustodyTransactions.init(
    {
      // --- RUNTIME DEFINITIONS ---
      dwollaCustodyTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      source: { type: DataTypes.STRING },
      destination: { type: DataTypes.STRING },
      notCompletedStatus: { type: DataTypes.STRING },
      completedStatus: { type: DataTypes.STRING },
      idempotencyId: { type: DataTypes.STRING },
      dwollaTransferId: { type: DataTypes.STRING },
      businessOwnerName: { type: DataTypes.STRING },
      businessOwnerEmail: { type: DataTypes.STRING },
      amount: { type: DataTypes.FLOAT },
      isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      failureCode: { type: DataTypes.STRING, allowNull: true },
      failureReason: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "DwollaCustodyTransactions",
      tableName: "dwollaCustodyTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaCustodyTransactions;
};
