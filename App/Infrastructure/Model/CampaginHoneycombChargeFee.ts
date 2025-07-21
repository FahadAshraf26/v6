import { Model, Sequelize } from "sequelize";

interface CampaignHoneycombChargeFeeAttributes {
  campaignHoneycombChargeFeeId: string;
  isChargeFee: boolean;
}

export class CampaignHoneycombChargeFee
  extends Model<CampaignHoneycombChargeFeeAttributes>
  implements CampaignHoneycombChargeFeeAttributes
{
  // These properties are explicitly declared for TypeScript's benefit.
  public campaignHoneycombChargeFeeId!: string;
  public isChargeFee!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignHoneycombChargeFee.init(
    {
      campaignHoneycombChargeFeeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      isChargeFee: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "CampaignHoneycombChargeFee",
      tableName: "campaignHoneycombChargeFees",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignHoneycombChargeFee;
};
