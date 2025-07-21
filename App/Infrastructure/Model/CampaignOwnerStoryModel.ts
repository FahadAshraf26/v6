import { Model, DataTypes, Sequelize } from "sequelize";

// Placeholder for associated model import
// import { Campaign } from './Campaign';

// Interface for type-safety on instance attributes
interface CampaignOwnerStoryAttributes {
  campaignOwnerStoryId: string;
  title: string;
  description: string;
  mediaUri: string | null;
  campaignId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class CampaignOwnerStory
  extends Model<CampaignOwnerStoryAttributes>
  implements CampaignOwnerStoryAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public campaignOwnerStoryId!: string;
  public title!: string;
  public description!: string;
  public mediaUri!: string | null;

  // Foreign Key
  public campaignId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly campaign?: any; // Replace 'any' with Campaign class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    models.Campaign.hasOne(this, {
      foreignKey: "campaignId",
      as: "ownerStory",
    });

    this.belongsTo(models.Campaign, {
      foreignKey: "campaignId",
      as: "campaign",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignOwnerStory.init(
    {
      // --- RUNTIME DEFINITIONS ---
      campaignOwnerStoryId: {
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
      mediaUri: {
        type: DataTypes.STRING,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "CampaignOwnerStory",
      tableName: "campaignOwnerStories",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignOwnerStory;
};
