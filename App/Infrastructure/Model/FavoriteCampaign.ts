import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface FavoriteCampaignAttributes {
  favoriteCampaignId: string;
  campaignId?: string;
  investorId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class FavoriteCampaign
  extends Model<FavoriteCampaignAttributes>
  implements FavoriteCampaignAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public favoriteCampaignId!: string;

  // Foreign Keys
  public campaignId!: string;
  public investorId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.Campaign, {
      foreignKey: "campaignId",
    });
    this.belongsTo(models.Investor, {
      foreignKey: "investorId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  FavoriteCampaign.init(
    {
      // --- RUNTIME DEFINITIONS ---
      favoriteCampaignId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "FavoriteCampaign",
      tableName: "favoriteCampaigns",
      timestamps: true,
      paranoid: true,
    }
  );

  return FavoriteCampaign;
};
