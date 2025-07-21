import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface CampaignRiskAttributes {
  campaignRiskId: string;
  title: string;
  description: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class CampaignRisk
  extends Model<CampaignRiskAttributes>
  implements CampaignRiskAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public campaignRiskId!: string;
  public title!: string;
  public description!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignRisk.init(
    {
      // --- RUNTIME DEFINITIONS ---
      campaignRiskId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "CampaignRisk",
      tableName: "campaignRisks",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignRisk;
};
