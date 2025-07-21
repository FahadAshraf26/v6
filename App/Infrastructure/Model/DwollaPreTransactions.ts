import {
  Model,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
} from "sequelize";

// Interface for type-safety on instance attributes
interface DwollaPreTransactionsAttributes {
  dwollaPreTransactionId: string;
  source: string | null;
  destination: string | null;
  interestPaid: number | null;
  principalPaid: number | null;
  total: number | null;
  status: string | null;
  issuerName: string | null;
  campaignName: string | null;
  issuerEmail: string | null;
  investorName: string | null;
  investorEmail: string | null;
  investorType: string | null;
  entityName: string | null;
  uploadId: string | null;
  errorMessage: any | null; // Or a more specific type for your JSON structure
  fileName: string | null;
}

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaPreTransactions
  extends Model<DwollaPreTransactionsAttributes>
  implements DwollaPreTransactionsAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public dwollaPreTransactionId!: string;
  public source!: string | null;
  public destination!: string | null;
  public interestPaid!: number | null;
  public principalPaid!: number | null;
  public total!: number | null;
  public status!: string | null;
  public issuerName!: string | null;
  public campaignName!: string | null;
  public issuerEmail!: string | null;
  public investorName!: string | null;
  public investorEmail!: string | null;
  public investorType!: string | null;
  public entityName!: string | null;
  public uploadId!: string | null;
  public errorMessage!: any | null;
  public fileName!: string | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association mixin methods ---
  public getDwollaPostTransactions!: HasManyGetAssociationsMixin<any>; // Replace 'any' with DwollaPostTransactions class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.hasMany(models.DwollaPostTransactions, {
      foreignKey: "dwollaPreTransactionId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaPreTransactions.init(
    {
      // --- RUNTIME DEFINITIONS ---
      dwollaPreTransactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      source: { type: DataTypes.STRING },
      destination: { type: DataTypes.STRING },
      interestPaid: { type: DataTypes.FLOAT },
      principalPaid: { type: DataTypes.FLOAT },
      total: { type: DataTypes.FLOAT },
      status: { type: DataTypes.STRING },
      issuerName: { type: DataTypes.STRING },
      campaignName: { type: DataTypes.STRING },
      issuerEmail: { type: DataTypes.STRING },
      investorName: { type: DataTypes.STRING },
      investorEmail: { type: DataTypes.STRING },
      investorType: { type: DataTypes.STRING },
      entityName: { type: DataTypes.STRING },
      uploadId: { type: DataTypes.STRING },
      errorMessage: { type: DataTypes.JSON },
      fileName: { type: DataTypes.STRING },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "DwollaPreTransactions",
      tableName: "dwollaPreTransactions",
      timestamps: true,
      paranoid: true,
    }
  );

  return DwollaPreTransactions;
};
