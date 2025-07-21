import { Model, Sequelize, HasManyGetAssociationsMixin } from "sequelize";

interface CampaignFundAttributes {
  campaignFundId: string;
  amount: number;
  investorAccreditationStatus: string;
  investorNetWorth: number;
  investorAnnualIncome: number;
  investmentType: string;
  ip: string | null;
  entityId: string | null;
  promotionCredits: number | null;
  netAmount: number | null;
  chargeId?: string;
  investorId?: string;
  campaignId?: string;
}

export class CampaignFund
  extends Model<CampaignFundAttributes>
  implements CampaignFundAttributes
{
  public campaignFundId!: string;
  public amount!: number;
  public investorAccreditationStatus!: string;
  public investorNetWorth!: number;
  public investorAnnualIncome!: number;
  public investmentType!: string;
  public ip!: string | null;
  public entityId!: string | null;
  public promotionCredits!: number | null;
  public netAmount!: number | null;

  public chargeId!: string;
  public investorId!: string;
  public campaignId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public getCampaignHybridTransactions!: HasManyGetAssociationsMixin<any>;

  public static associate(models: any) {
    this.belongsTo(models.Charge, {
      foreignKey: "chargeId",
      as: "charge",
    });

    models.Charge.hasOne(this, {
      foreignKey: "chargeId",
      as: "investmentCharge",
    });

    models.Investor.hasOne(this, {
      foreignKey: "investorId",
      as: "investor",
    });

    models.Campaign.hasOne(this, {
      foreignKey: "campaignId",
      as: "campaign",
    });

    this.hasMany(models.HybridTransaction, {
      foreignKey: "campaignFundId",
      as: "campaignHybridTransactions",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignFund.init(
    {
      campaignFundId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      investorAccreditationStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      investorNetWorth: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      investorAnnualIncome: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      investmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entityId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      promotionCredits: {
        type: DataTypes.FLOAT,
      },
      netAmount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "CampaignFund",
      tableName: "campaignFunds",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignFund;
};
