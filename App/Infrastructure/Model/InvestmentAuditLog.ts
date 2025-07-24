import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface InvestmentAuditLogAttributes {
  investmentAuditLogId: string;
  campaignFundId: string;
  adminUserId: string;
  adminUserEmail: string;
  campaignId: string;
  investorEmail: string;
  changes: any; // Or a more specific type for your JSON structure
  timestamp: Date;
}

// Extend Sequelize's Model class and implement our attributes interface
export class InvestmentAuditLog
  extends Model<InvestmentAuditLogAttributes>
  implements InvestmentAuditLogAttributes
{
  // --- TYPE DEFINITIONS ---
  public investmentAuditLogId!: string;
  public campaignFundId!: string;
  public adminUserId!: string;
  public adminUserEmail!: string;
  public campaignId!: string;
  public investorEmail!: string;
  public changes!: any;
  public timestamp!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly campaignFund?: any; // Replace with CampaignFund class
  public readonly adminUser?: any; // Replace with AdminUser class
  public readonly campaign?: any; // Replace with Campaign class

  // --- STATIC ASSOCIATE METHOD ---
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

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  InvestmentAuditLog.init(
    {
      // --- RUNTIME DEFINITIONS ---
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
      // --- Model Options ---
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
