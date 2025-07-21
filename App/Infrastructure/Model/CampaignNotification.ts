import { Model, DataTypes, Sequelize } from "sequelize";

// Placeholders for associated model imports
// import { Campaign } from './Campaign';
// import { Investor } from './Investor';
// import { CampaignNews } from './CampaignNews';

// Interface for type-safety on instance attributes
interface CampaignNotificationAttributes {
  campaignNotificationId: string;
  isSeen: boolean | null;
  campaignId?: string;
  investorId?: string;
  campaignNewsId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class CampaignNotification
  extends Model<CampaignNotificationAttributes>
  implements CampaignNotificationAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public campaignNotificationId!: string;
  public isSeen!: boolean | null;

  // Foreign Keys
  public campaignId!: string;
  public investorId!: string;
  public campaignNewsId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly campaign?: any; // Replace 'any' with Campaign class
  public readonly campaignNews?: any; // Replace 'any' with CampaignNews class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.Campaign, {
      foreignKey: "campaignId",
      as: "campaign",
    });

    this.belongsTo(models.Investor, {
      foreignKey: "investorId",
    });

    this.belongsTo(models.CampaignNews, {
      foreignKey: "campaignNewsId",
      as: "campaignNews",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignNotification.init(
    {
      // --- RUNTIME DEFINITIONS ---
      campaignNotificationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      isSeen: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "CampaignNotification",
      tableName: "campaignNotifications",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignNotification;
};
