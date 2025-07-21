import { Model, DataTypes, Sequelize } from "sequelize";

// Placeholders for associated model imports
// import { CampaignQA } from './CampaignQA';
// import { User } from './User';

// Interface for type-safety on instance attributes
interface CampaignQAReportAttributes {
  campaignQAReportId: string;
  text: string;
  campaignQAId?: string;
  userId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class CampaignQAReport
  extends Model<CampaignQAReportAttributes>
  implements CampaignQAReportAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public campaignQAReportId!: string;
  public text!: string;

  // Foreign Keys
  public campaignQAId!: string;
  public userId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly question?: any; // Replace 'any' with CampaignQA class
  public readonly user?: any; // Replace 'any' with User class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    models.CampaignQA.hasMany(this, {
      foreignKey: "campaignQAId",
      as: "reports",
    });

    this.belongsTo(models.CampaignQA, {
      foreignKey: "campaignQAId",
      as: "question",
    });

    models.User.hasMany(this, {
      foreignKey: "userId",
      as: "reportedQuestions",
    });

    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignQAReport.init(
    {
      // --- RUNTIME DEFINITIONS ---
      campaignQAReportId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "CampaignQAReport",
      tableName: "campaignQAReports",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignQAReport;
};
