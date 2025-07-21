import {
  Model,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
} from "sequelize";

// Interface for type-safety on instance attributes
interface InvestorAttributes {
  investorId: string;
  annualIncome: number;
  netWorth: number;
  incomeVerificationTriggered: boolean;
  investingAvailable: number;
  isAccredited: string;
  investmentCap: number | null;
  userProvidedCurrentInvestments: number | null;
  userProvidedCurrentInvestmentsDate: Date | null;
  investReadyToken: string | null;
  investReadyRefreshToken: string | null;
  investReadyUserHash: string | null;
  accreditationExpiryDate: Date | null;
  dwollaCustomerId: string | null;
  accreditedInvestorSubmission: string | null;
  accreditedInvestorSubmissionDate: Date | null;
  dwollaVerificationStatus: string | null;
  ncAccountId: string | null;
  incomeNetWorthSignedOn: Date;
  vcCustomerKey: string | null;
  vcThreadBankCustomerKey: string | null;
  userId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class Investor
  extends Model<InvestorAttributes>
  implements InvestorAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public investorId!: string;
  public annualIncome!: number;
  public netWorth!: number;
  public incomeVerificationTriggered!: boolean;
  public investingAvailable!: number;
  public isAccredited!: string;
  public investmentCap!: number | null;
  public userProvidedCurrentInvestments!: number | null;
  public userProvidedCurrentInvestmentsDate!: Date | null;
  public investReadyToken!: string | null;
  public investReadyRefreshToken!: string | null;
  public investReadyUserHash!: string | null;
  public accreditationExpiryDate!: Date | null;
  public dwollaCustomerId!: string | null;
  public accreditedInvestorSubmission!: string | null;
  public accreditedInvestorSubmissionDate!: Date | null;
  public dwollaVerificationStatus!: string | null;
  public ncAccountId!: string | null;
  public incomeNetWorthSignedOn!: Date;
  public vcCustomerKey!: string | null;
  public vcThreadBankCustomerKey!: string | null;

  // Foreign Key
  public userId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly userSender?: any; // Replace 'any' with User class

  // --- Association mixin methods ---
  public getCampaignFunds!: HasManyGetAssociationsMixin<any>; // Replace 'any' with CampaignFund class
  public getRepayments!: HasManyGetAssociationsMixin<any>; // Replace 'any' with Repayment class
  // ... and so on for other hasMany associations

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    models.CampaignFund.belongsTo(this, { foreignKey: "investorId" });
    this.hasMany(models.CampaignFund, { foreignKey: "investorId" });

    models.User.hasOne(this, { foreignKey: "userId", as: "userSender" });

    models.Repayment.belongsTo(this, { foreignKey: "investorId" });
    this.hasMany(models.Repayment, { foreignKey: "investorId" });

    models.InvestorPayments.belongsTo(this, { foreignKey: "investorId" });
    this.hasMany(models.InvestorPayments, { foreignKey: "investorId" });

    this.hasMany(models.CampaignNotification, { foreignKey: "investorId" });
    this.hasMany(models.FavoriteCampaign, { foreignKey: "investorId" });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  Investor.init(
    {
      // --- RUNTIME DEFINITIONS ---
      investorId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      annualIncome: { type: DataTypes.BIGINT, allowNull: false },
      netWorth: { type: DataTypes.BIGINT, allowNull: false },
      incomeVerificationTriggered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      investingAvailable: { type: DataTypes.INTEGER, allowNull: false },
      isAccredited: { type: DataTypes.STRING, allowNull: false },
      investmentCap: { type: DataTypes.INTEGER },
      userProvidedCurrentInvestments: { type: DataTypes.BIGINT },
      userProvidedCurrentInvestmentsDate: { type: DataTypes.DATE },
      investReadyToken: { type: DataTypes.STRING },
      investReadyRefreshToken: { type: DataTypes.STRING },
      investReadyUserHash: { type: DataTypes.STRING },
      accreditationExpiryDate: { type: DataTypes.DATE },
      dwollaCustomerId: { type: DataTypes.STRING },
      accreditedInvestorSubmission: { type: DataTypes.STRING },
      accreditedInvestorSubmissionDate: { type: DataTypes.DATEONLY },
      dwollaVerificationStatus: { type: DataTypes.STRING },
      ncAccountId: { type: DataTypes.STRING },
      incomeNetWorthSignedOn: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      vcCustomerKey: { type: DataTypes.STRING },
      vcThreadBankCustomerKey: { type: DataTypes.STRING },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "Investor",
      tableName: "investors",
      timestamps: true,
      paranoid: true,
    }
  );

  return Investor;
};
