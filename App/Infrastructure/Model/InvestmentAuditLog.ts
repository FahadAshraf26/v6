import { Model, Sequelize } from "sequelize";

interface InvestmentAuditLogAttributes {
  investmentAuditLogId: string;
  campaignFundId: string;
  adminUserId: string;
  adminUserEmail: string;
  campaignId: string;
  investorEmail: string;
  changes: any;
  timestamp: Date;
}

export class InvestmentAuditLog
  extends Model<InvestmentAuditLogAttributes>
  implements InvestmentAuditLogAttributes
{
  public investmentAuditLogId!: string;
  public campaignFundId!: string;
  public adminUserId!: string;
  public adminUserEmail!: string;
  public campaignId!: string;
  public investorEmail!: string;
  public changes!: any;
  public timestamp!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public readonly campaignFund?: any;
  public readonly adminUser?: any;
  public readonly campaign?: any;

  public static associate(models: any) {
    this.belongsTo(models.CampaignFund, {
      foreignKey: "campaignFundId",
      as: "campaignFund",
    });

    this.belongsTo(models.AdminUser, {
      foreignKey: "adminUserId",
      as: "adminUser",
    });

    this.belongsTo(models.Campaign, {
      foreignKey: "campaignId",
      as: "campaign",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  InvestmentAuditLog.init(
    {
      investmentAuditLogId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      campaignFundId: { type: DataTypes.STRING, allowNull: false },
      adminUserId: { type: DataTypes.STRING, allowNull: false },
      adminUserEmail: { type: DataTypes.STRING, allowNull: false },
      campaignId: { type: DataTypes.STRING, allowNull: false },
      investorEmail: { type: DataTypes.STRING, allowNull: false },
      changes: { type: DataTypes.JSON, allowNull: false },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "InvestmentAuditLog",
      tableName: "investmentAuditLogs",
      timestamps: true,
      paranoid: true,
      indexes: [
        { fields: ["campaignFundId"] },
        { fields: ["adminUserId"] },
        { fields: ["campaignId"] },
        { fields: ["investorEmail"] },
        { fields: ["timestamp"] },
      ],
    }
  );

  return InvestmentAuditLog;
};
