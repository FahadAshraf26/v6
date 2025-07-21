import {
  Model,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
} from "sequelize";

// Interface for type-safety on instance attributes
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

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaCustodyTransferHistory
  extends Model<DwollaCustodyTransferHistoryAttributes>
  implements DwollaCustodyTransferHistoryAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public dwollaCustodyTransferHistoryId!: string;
  public source!: string | null;
  public destination!: string | null;
  public dwollaTransferId!: string | null;
  public businessOwnerName!: string | null;
  public businessOwnerEmail!: string | null;
  public amount!: number | null;

  // Foreign Key
  public issuerId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association mixin methods ---
  public getDwollaPostBankTransactions!: HasManyGetAssociationsMixin<any>; // Replace 'any' with DwollaPostBankTransactions class

  // --- STATIC ASSOCIATE METHOD ---
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

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaCustodyTransferHistory.init(
    {
      // --- RUNTIME DEFINITIONS ---
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
      // --- Model Options ---
      sequelize,
      modelName: "DwollaCustodyTransferHistory",
      tableName: "dwollaCustodyTransferHistories",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaCustodyTransferHistory;
};
