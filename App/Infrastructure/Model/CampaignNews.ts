import {
  Model,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
} from "sequelize";

// import { CampaignNotification } from './CampaignNotification';

// Interface for type-safety on instance attributes
interface CampaignNewsAttributes {
  campaignNewsId: string;
  title: string;
  description: string;
  hyperLink: string | null;
  hyperLinkText: string | null;
}

export class CampaignNews
  extends Model<CampaignNewsAttributes>
  implements CampaignNewsAttributes
{
  public campaignNewsId!: string;
  public title!: string;
  public description!: string;
  public hyperLink!: string | null;
  public hyperLinkText!: string | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public readonly campaignNews?: any[]; // Replace 'any' with CampaignNotification class

  public getCampaignNews!: HasManyGetAssociationsMixin<any>; // Replace 'any' with CampaignNotification class
  public addCampaignNews!: HasManyAddAssociationMixin<any, string>; // Replace 'any' with CampaignNotification class

  public static associate(models: any) {
    this.hasMany(models.CampaignNotification, {
      foreignKey: "campaignNewsId",
      as: "campaignNews",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignNews.init(
    {
      campaignNewsId: {
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
      hyperLink: {
        type: DataTypes.STRING,
      },
      hyperLinkText: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "CampaignNews",
      tableName: "campaignNews",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignNews;
};
