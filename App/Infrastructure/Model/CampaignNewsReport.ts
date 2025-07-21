import { Model, Sequelize } from "sequelize";

// Placeholders for associated model imports
// import { CampaignNews } from './CampaignNews';
// import { User } from './User';

interface CampaignNewsReportAttributes {
  campaignNewsReportId: string;
  text: string;
  campaignNewsId?: string;
  userId?: string;
}

export class CampaignNewsReport
  extends Model<CampaignNewsReportAttributes>
  implements CampaignNewsReportAttributes
{
  public campaignNewsReportId!: string;
  public text!: string;

  public campaignNewsId!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public readonly question?: any; // Replace 'any' with CampaignNews class
  public readonly user?: any; // Replace 'any' with User class

  public static associate(models: any) {
    models.CampaignNews.hasMany(this, {
      foreignKey: "campaignNewsId",
      as: "reports",
    });

    this.belongsTo(models.CampaignNews, {
      foreignKey: "campaignNewsId",
      as: "question",
    });

    models.User.hasMany(this, {
      foreignKey: "userId",
      as: "reportedUpdates",
    });

    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignNewsReport.init(
    {
      campaignNewsReportId: {
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
      sequelize,
      modelName: "CampaignNewsReport",
      tableName: "campaignNewsReports",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignNewsReport;
};
