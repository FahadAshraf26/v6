import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface HybridTransactionAttributes {
  hybridTransactionId: string;
  amount: number | null;
  transactionType: string | null;
  tradeId: string | null;
  refrenceNumber: string | null;
  dwollaTransactionId: string | null;
  individualACHId: string | null;
  applicationFee: number | null;
  status: string | null;
  isSent: boolean | null;
  walletAmount: number | null;
  source: string | null;
  debitAuthorizationId: string | null;
  nachaFileName: string | null;
  achRefunded: boolean | null;
  walletRefunded: boolean | null;
  campaignFundId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class HybridTransaction
  extends Model<HybridTransactionAttributes>
  implements HybridTransactionAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public hybridTransactionId!: string;
  public amount!: number | null;
  public transactionType!: string | null;
  public tradeId!: string | null;
  public refrenceNumber!: string | null;
  public dwollaTransactionId!: string | null;
  public individualACHId!: string | null;
  public applicationFee!: number | null;
  public status!: string | null;
  public isSent!: boolean | null;
  public walletAmount!: number | null;
  public source!: string | null;
  public debitAuthorizationId!: string | null;
  public nachaFileName!: string | null;
  public achRefunded!: boolean | null;
  public walletRefunded!: boolean | null;

  // Foreign Key
  public campaignFundId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.CampaignFund, {
      foreignKey: "campaignFundId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  HybridTransaction.init(
    {
      // --- RUNTIME DEFINITIONS ---
      hybridTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      amount: { type: DataTypes.FLOAT },
      transactionType: { type: DataTypes.STRING },
      tradeId: { type: DataTypes.STRING },
      refrenceNumber: { type: DataTypes.STRING },
      dwollaTransactionId: { type: DataTypes.STRING },
      individualACHId: { type: DataTypes.STRING },
      applicationFee: { type: DataTypes.FLOAT },
      status: { type: DataTypes.STRING },
      isSent: { type: DataTypes.BOOLEAN },
      walletAmount: { type: DataTypes.FLOAT },
      source: { type: DataTypes.STRING },
      debitAuthorizationId: { type: DataTypes.STRING },
      nachaFileName: { type: DataTypes.STRING },
      achRefunded: { type: DataTypes.BOOLEAN },
      walletRefunded: { type: DataTypes.BOOLEAN },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "HybridTransaction",
      tableName: "hybridTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return HybridTransaction;
};
