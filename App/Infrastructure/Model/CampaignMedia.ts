import { Model, Sequelize } from "sequelize";

interface CampaignMediaAttributes {
  campaignMediaId: string;
  path: string;
  originalPath: string | null;
  mimeType: string;
  position: number | null;
}

export class CampaignMedia
  extends Model<CampaignMediaAttributes>
  implements CampaignMediaAttributes
{
  public campaignMediaId!: string;
  public path!: string;
  public originalPath!: string | null;
  public mimeType!: string;
  public position!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignMedia.init(
    {
      campaignMediaId: {
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
      position: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "CampaignMedia",
      tableName: "campaignMedia",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignMedia;
};
