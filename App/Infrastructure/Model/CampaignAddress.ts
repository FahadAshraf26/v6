import { Model, Sequelize } from "sequelize";

interface CampaignAddressAttributes {
  campaignAddressId: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: string | null;
  longitude: string | null;
  campaignId?: string;
}

export class CampaignAddress
  extends Model<CampaignAddressAttributes>
  implements CampaignAddressAttributes
{
  public campaignAddressId!: string;
  public address!: string | null;
  public city!: string | null;
  public state!: string | null;
  public zipCode!: string | null;
  public latitude!: string | null;
  public longitude!: string | null;

  public campaignId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Campaign, {
      foreignKey: "campaignId",
      as: "campaign",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignAddress.init(
    {
      campaignAddressId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CampaignAddress",
      tableName: "campaignAddresses",
      timestamps: true,
    }
  );

  return CampaignAddress;
};
