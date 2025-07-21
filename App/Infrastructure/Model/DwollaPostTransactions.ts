import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
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

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaPostTransactions
  extends Model<DwollaPostTransactionsAttributes>
  implements DwollaPostTransactionsAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
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

  // Foreign Keys
  public issuerId!: string;
  public dwollaPreTransactionId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });

    this.belongsTo(models.DwollaPreTransactions, {
      foreignKey: "dwollaPreTransactionId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaPostTransactions.init(
    {
      // --- RUNTIME DEFINITIONS ---
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
      // --- Model Options ---
      sequelize,
      modelName: "DwollaPostTransactions",
      tableName: "dwollaPostTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaPostTransactions;
};
