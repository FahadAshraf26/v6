import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface DwollaToBankTransactionsAttributes {
  dwollaToBankTransactionId: string;
  transferStatus: string | null;
  amount: number | null;
  dwollaTransactionId: string | null;
  idempotencyKey: string | null;
  userId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaToBankTransactions
  extends Model<DwollaToBankTransactionsAttributes>
  implements DwollaToBankTransactionsAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public dwollaToBankTransactionId!: string;
  public transferStatus!: string | null;
  public amount!: number | null;
  public dwollaTransactionId!: string | null;
  public idempotencyKey!: string | null;

  // Foreign Key
  public userId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaToBankTransactions.init(
    {
      // --- RUNTIME DEFINITIONS ---
      dwollaToBankTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      transferStatus: { type: DataTypes.STRING },
      amount: { type: DataTypes.FLOAT },
      dwollaTransactionId: { type: DataTypes.STRING },
      idempotencyKey: { type: DataTypes.STRING },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "DwollaToBankTransactions",
      tableName: "dwollaToBankTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaToBankTransactions;
};
