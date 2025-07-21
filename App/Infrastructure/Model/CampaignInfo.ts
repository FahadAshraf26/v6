import { Model, Sequelize } from "sequelize";

interface CampaignInfoAttributes {
  campaignInfoId: string;
  financialHistory: string;
  competitors: string;
  milestones: string;
  investorPitch: string;
  risks: string;
  target: any | null;
  isShowPitch: boolean | null;
  investorPitchTitle: string;
}

export class CampaignInfo
  extends Model<CampaignInfoAttributes>
  implements CampaignInfoAttributes
{
  public campaignInfoId!: string;
  public financialHistory!: string;
  public competitors!: string;
  public milestones!: string;
  public investorPitch!: string;
  public risks!: string;
  public target!: any | null;
  public isShowPitch!: boolean | null;
  public investorPitchTitle!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignInfo.init(
    {
      campaignInfoId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      financialHistory: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      competitors: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      milestones: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      investorPitch: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      risks: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      target: {
        type: DataTypes.JSON,
      },
      isShowPitch: {
        type: DataTypes.BOOLEAN,
      },
      investorPitchTitle: {
        type: DataTypes.STRING,
        defaultValue: "Investor Pitch",
      },
    },
    {
      sequelize,
      modelName: "CampaignInfo",
      tableName: "campaignInfos",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignInfo;
};
