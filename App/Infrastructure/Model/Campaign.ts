import { Model, Sequelize, BelongsToManyAddAssociationMixin } from "sequelize";

// Import associated model types for strong typing.
// These are placeholders; you should use your actual import paths.
import { Issuer } from "./Issuer";
import { Tag } from "./Tag";
import { Investor } from "./Investor";
import { CampaignInfo } from "./CampaignInfo";
// import { CampaignOfferingChange } from "./Cam";
// import { CampaignNotes } from "./CampaignNotes";
// import { CampaignPrincipleForgiven } from "./CampaignPrincipleForgiven";
import { CampaignAddress } from "./CampaignAddress";
// ... and so on for all other associated models.

// Interface for type-safety on instance attributes
interface CampaignAttributes {
  campaignId: string;
  campaignName: string;
  campaignStartDate: Date | null;
  campaignDuration: number | null;
  campaignExpirationDate: Date | null;
  campaignStage: string | null;
  campaignTargetAmount: number;
  campaignMinimumAmount: number;
  investmentType: string;
  earningProcess: string | null;
  overSubscriptionAccepted: boolean | null;
  typeOfSecurityOffered: string | null;
  useOfProceeds: string | null;
  salesLead: string | null;
  summary: string | null;
  demoLink: string | null;
  isLocked: boolean | null;
  financialProjectionsDescription: string | null;
  howHoneycombIsCompensated: string | null;
  campaignDocumentUrl: string | null;
  ncOfferingId: string | null;
  slug: string;
  repaymentSchedule: string | null;
  collateral: string | null;
  annualInterestRate: number | null;
  maturityDate: Date | null;
  repaymentStartDate: Date | null;
  loanDuration: number | null;
  isChargeFee: boolean;
  interestOnlyLoanDuration: number | null;
  campaignEndTime: string | null;
  campaignTimezone: string | null;
  blanketLien: boolean | null;
  equipmentLien: boolean | null;
  isPersonalGuarantyFilled: boolean | null;
  personalGuaranty: string | null;
  shareValue: number | null;
  escrowType: string | null;
  isChargeStripe: boolean;
  isCampaignAddress: boolean;
  competitorOffering: string | null;
  isShowOnExplorePage: boolean;
  investmentConfiguration: any | null; // Or a more specific type for your JSON structure
  dividendRate: number | null;
  issuerId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class Campaign
  extends Model<CampaignAttributes>
  implements CampaignAttributes
{
  // --- TYPE DEFINITIONS ---
  public campaignId!: string;
  public campaignName!: string;
  public campaignStartDate!: Date | null;
  public campaignDuration!: number | null;
  public campaignExpirationDate!: Date | null;
  public campaignStage!: string | null;
  public campaignTargetAmount!: number;
  public campaignMinimumAmount!: number;
  public investmentType!: string;
  public earningProcess!: string | null;
  public overSubscriptionAccepted!: boolean | null;
  public typeOfSecurityOffered!: string | null;
  public useOfProceeds!: string | null;
  public salesLead!: string | null;
  public summary!: string | null;
  public demoLink!: string | null;
  public isLocked!: boolean | null;
  public financialProjectionsDescription!: string | null;
  public howHoneycombIsCompensated!: string | null;
  public campaignDocumentUrl!: string | null;
  public ncOfferingId!: string | null;
  public slug!: string;
  public repaymentSchedule!: string | null;
  public collateral!: string | null;
  public annualInterestRate!: number | null;
  public maturityDate!: Date | null;
  public repaymentStartDate!: Date | null;
  public loanDuration!: number | null;
  public isChargeFee!: boolean;
  public interestOnlyLoanDuration!: number | null;
  public campaignEndTime!: string | null;
  public campaignTimezone!: string | null;
  public blanketLien!: boolean | null;
  public equipmentLien!: boolean | null;
  public isPersonalGuarantyFilled!: boolean | null;
  public personalGuaranty!: string | null;
  public shareValue!: number | null;
  public escrowType!: string | null;
  public isChargeStripe!: boolean;
  public isCampaignAddress!: boolean;
  public competitorOffering!: string | null;
  public isShowOnExplorePage!: boolean;
  public investmentConfiguration!: any | null;
  public dividendRate!: number | null;

  // Foreign keys and timestamps
  public issuerId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly issuer?: Issuer;
  public readonly tags?: Tag[];
  public readonly interestedInvestors?: Investor[];
  public readonly campaignInfo?: CampaignInfo;
  // public readonly campaignOfferingChange?: CampaignOfferingChange[];
  // public readonly campaignNotes?: CampaignNotes[];
  // public readonly campaignPrincipleForgiven?: CampaignPrincipleForgiven;
  public readonly campaignAddress?: CampaignAddress;
  // ... and so on for other aliased associations

  // --- Association mixin methods ---
  public addTag!: BelongsToManyAddAssociationMixin<Tag, string>;
  // ... and so on for other associations

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    // Issuer
    models.Issuer.hasMany(this, { foreignKey: "issuerId", as: "campaigns" });
    this.belongsTo(models.Issuer, { foreignKey: "issuerId", as: "issuer" });

    // Campaign Tag (Many-to-Many)
    models.Tag.belongsToMany(this, {
      through: models.CampaignTag,
      as: "campaigns",
      foreignKey: "tagId",
    });
    this.belongsToMany(models.Tag, {
      through: models.CampaignTag,
      as: "tags",
      foreignKey: "campaignId",
    });
    models.CampaignTag.belongsTo(models.Tag, {
      as: "tag",
      foreignKey: "tagId",
    });
    models.CampaignTag.belongsTo(this, { foreignKey: "campaignId" });

    // Favorite Campaign (Many-to-Many)
    models.Investor.belongsToMany(this, {
      through: models.FavoriteCampaign,
      foreignKey: "investorId",
      as: "campaigns",
    });
    this.belongsToMany(models.Investor, {
      through: models.FavoriteCampaign,
      foreignKey: "campaignId",
      as: "interestedInvestors",
    });
    this.hasMany(models.FavoriteCampaign, { foreignKey: "campaignId" });
    models.FavoriteCampaign.belongsTo(models.Investor, {
      foreignKey: "investorId",
      as: "investor",
    });
    models.Investor.hasMany(models.FavoriteCampaign, {
      foreignKey: "investorId",
      as: "likedCampaigns",
    });

    // Campaign News
    this.hasMany(models.CampaignNews, {
      foreignKey: "campaignId",
      as: "campaignNews",
    });
    models.CampaignNews.belongsTo(this, {
      foreignKey: "campaignId",
      as: "campaigns",
    });

    // Campaign Offering Change
    // this.hasMany(models.CampaignOfferingChange, {
    //   foreignKey: "campaignId",
    //   as: "campaignOfferingChange",
    // });
    // models.CampaignOfferingChange.belongsTo(this, {
    //   foreignKey: "campaignId",
    //   as: "campaigns",
    // });

    // Campaign Documents
    this.hasMany(models.CampaignDocument, { foreignKey: "campaignId" });

    // Campaign Risk
    this.hasMany(models.CampaignRisk, { foreignKey: "campaignId" });
    models.CampaignRisk.belongsTo(this, { foreignKey: "campaignId" });

    // Campaign Notes
    // this.hasMany(models.CampaignNotes, {
    //   foreignKey: "campaignId",
    //   as: "campaignNotes",
    // });

    // Campaign QA
    this.hasMany(models.CampaignQA, {
      onDelete: "CASCADE",
      foreignKey: "campaignId",
    });
    models.CampaignQA.belongsTo(this, { foreignKey: "campaignId" });
    models.User.hasMany(models.CampaignQA, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "userQuestions",
    });
    models.CampaignQA.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "user",
    });

    // Campaign Info
    this.hasOne(models.CampaignInfo, {
      foreignKey: "campaignId",
      as: "campaignInfo",
    });
    models.CampaignInfo.belongsTo(this, { foreignKey: "campaignId" });

    // Campaign RoughBudget
    this.hasMany(models.RoughBudget, { foreignKey: "campaignId" });
    models.RoughBudget.belongsTo(this, { foreignKey: "campaignId" });

    // Campaign PL
    this.hasMany(models.PL, { foreignKey: "campaignId" });
    models.PL.belongsTo(this, { foreignKey: "campaignId" });

    // Campaign News Media
    models.CampaignNews.hasMany(models.CampaignNewsMedia, {
      foreignKey: "campaignNewsId",
    });

    // Campaign Media
    this.hasMany(models.CampaignMedia, { foreignKey: "campaignId" });
    models.CampaignMedia.belongsTo(this, { foreignKey: "campaignId" });

    // Campaign Fund
    this.hasMany(models.CampaignFund, {
      foreignKey: "campaignId",
      as: "campaignFunds",
    });
    models.CampaignFund.belongsTo(this, {
      foreignKey: "campaignId",
      as: "campaign",
    });
    models.Investor.hasMany(models.CampaignFund, {
      foreignKey: "investorId",
      as: "investments",
    });
    models.CampaignFund.belongsTo(models.Investor, {
      foreignKey: "investorId",
      as: "campaignInvestor",
    });
    this.hasOne(models.CampaignFund, { foreignKey: "campaignId" });

    // Campaign Charge Fee
    this.hasMany(models.CampaignHoneycombChargeFee, {
      foreignKey: "campaignId",
      as: "campaignHoneycombChargeFee",
    });
    models.CampaignHoneycombChargeFee.belongsTo(this, {
      foreignKey: "campaignId",
    });

    // Repayments
    this.hasMany(models.Repayment, { foreignKey: "campaignId" });

    // Investor Payments
    this.hasMany(models.InvestorPayments, { foreignKey: "campaignId" });
    models.InvestorPayments.belongsTo(this, { foreignKey: "campaignId" });

    // Campaign Principle Forgiven
    // this.hasOne(models.CampaignPrincipleForgiven, {
    //   foreignKey: "campaignId",
    //   as: "campaignPrincipleForgiven",
    // });

    // Campaign Notification
    this.hasMany(models.CampaignNotification, { foreignKey: "campaignId" });

    // Campaign Address
    this.hasOne(models.CampaignAddress, {
      foreignKey: "campaignId",
      as: "campaignAddress",
    });

    this.hasMany(models.InvestmentAuditLog, {
      foreignKey: "campaignId",
      as: "investmentAuditLogs",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  Campaign.init(
    {
      // --- RUNTIME DEFINITIONS ---
      campaignId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      campaignName: { type: DataTypes.STRING, allowNull: false },
      campaignStartDate: { type: DataTypes.DATEONLY },
      campaignDuration: { type: DataTypes.INTEGER },
      campaignExpirationDate: { type: DataTypes.DATEONLY },
      campaignStage: { type: DataTypes.STRING },
      campaignTargetAmount: { type: DataTypes.FLOAT, allowNull: false },
      campaignMinimumAmount: { type: DataTypes.FLOAT, allowNull: false },
      investmentType: { type: DataTypes.STRING, allowNull: false },
      earningProcess: { type: DataTypes.TEXT, allowNull: true },
      overSubscriptionAccepted: { type: DataTypes.BOOLEAN },
      typeOfSecurityOffered: { type: DataTypes.TEXT },
      useOfProceeds: { type: DataTypes.TEXT },
      salesLead: { type: DataTypes.STRING },
      summary: { type: DataTypes.TEXT },
      demoLink: { type: DataTypes.TEXT },
      isLocked: { type: DataTypes.BOOLEAN },
      financialProjectionsDescription: { type: DataTypes.TEXT },
      howHoneycombIsCompensated: { type: DataTypes.TEXT },
      campaignDocumentUrl: { type: DataTypes.TEXT },
      ncOfferingId: { type: DataTypes.STRING },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      repaymentSchedule: { type: DataTypes.STRING },
      collateral: { type: DataTypes.STRING },
      annualInterestRate: { type: DataTypes.FLOAT },
      maturityDate: { type: DataTypes.DATE },
      repaymentStartDate: { type: DataTypes.DATE },
      loanDuration: { type: DataTypes.FLOAT },
      isChargeFee: { type: DataTypes.BOOLEAN, defaultValue: true },
      interestOnlyLoanDuration: { type: DataTypes.FLOAT },
      campaignEndTime: { type: DataTypes.STRING },
      campaignTimezone: { type: DataTypes.STRING },
      blanketLien: { type: DataTypes.BOOLEAN },
      equipmentLien: { type: DataTypes.BOOLEAN },
      isPersonalGuarantyFilled: { type: DataTypes.BOOLEAN },
      personalGuaranty: { type: DataTypes.STRING },
      shareValue: { type: DataTypes.FLOAT },
      escrowType: { type: DataTypes.STRING },
      isChargeStripe: { type: DataTypes.BOOLEAN, defaultValue: true },
      isCampaignAddress: { type: DataTypes.BOOLEAN, defaultValue: false },
      competitorOffering: { type: DataTypes.STRING, allowNull: true },
      isShowOnExplorePage: { type: DataTypes.BOOLEAN, defaultValue: true },
      investmentConfiguration: { type: DataTypes.JSON },
      dividendRate: { type: DataTypes.FLOAT },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "Campaign",
      tableName: "campaigns",
      timestamps: true,
      paranoid: true,
    }
  );

  return Campaign;
};
