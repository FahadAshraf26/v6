import { Model, Sequelize } from "sequelize";

interface CampaignNewsMediaAttributes {
  campaignNewsMediaId: string;
  path: string;
  originalPath: string | null;
  mimeType: string;
}

export class CampaignNewsMedia
  extends Model<CampaignNewsMediaAttributes>
  implements CampaignNewsMediaAttributes
{
  public campaignNewsMediaId!: string;
  public path!: string;
  public originalPath!: string | null;
  public mimeType!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignNewsMedia.init(
    {
      campaignNewsMediaId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      originalPath: {
        type: DataTypes.STRING,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CampaignNewsMedia",
      tableName: "campaignNewsMedia",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignNewsMedia;
};
