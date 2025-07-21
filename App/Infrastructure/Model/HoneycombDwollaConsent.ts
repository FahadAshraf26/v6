import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface HoneycombDwollaConsentAttributes {
  honeycombDwollaConsentId: string;
  consentDate: Date | null;
  userId?: string;
  issuerId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class HoneycombDwollaConsent
  extends Model<HoneycombDwollaConsentAttributes>
  implements HoneycombDwollaConsentAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public honeycombDwollaConsentId!: string;
  public consentDate!: Date | null;

  // Foreign Keys
  public userId!: string;
  public issuerId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });

    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  HoneycombDwollaConsent.init(
    {
      // --- RUNTIME DEFINITIONS ---
      honeycombDwollaConsentId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      consentDate: {
        type: DataTypes.DATE,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "HoneycombDwollaConsent",
      tableName: "honeycombDwollaConsents",
      timestamps: true,
      paranoid: true,
    }
  );

  return HoneycombDwollaConsent;
};
