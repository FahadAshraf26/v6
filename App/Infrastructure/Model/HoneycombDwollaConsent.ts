import { Model, Sequelize } from "sequelize";

interface HoneycombDwollaConsentAttributes {
  honeycombDwollaConsentId: string;
  consentDate: Date | null;
  userId?: string;
  issuerId?: string;
}

export class HoneycombDwollaConsent
  extends Model<HoneycombDwollaConsentAttributes>
  implements HoneycombDwollaConsentAttributes
{
  public honeycombDwollaConsentId!: string;
  public consentDate!: Date | null;
  public userId!: string;
  public issuerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });

    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  HoneycombDwollaConsent.init(
    {
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
      sequelize,
      modelName: "HoneycombDwollaConsent",
      tableName: "honeycombDwollaConsents",
      timestamps: true,
      paranoid: true,
    }
  );

  return HoneycombDwollaConsent;
};
