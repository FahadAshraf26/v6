import { Model, Sequelize } from "sequelize";

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

export class Investor
  extends Model<InvestorAttributes>
  implements InvestorAttributes
{
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

  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public readonly userSender?: any;

  public static associate(models: any) {
    this.hasMany(models.CampaignFund, { foreignKey: "investorId" });
    this.hasMany(models.InvestorAccreditation, {
      foreignKey: "investorId",
      as: "investorAccreditation",
    });
    // models.User.hasOne(this, { foreignKey: "userId", as: "userSender" });
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.hasMany(models.Repayment, { foreignKey: "investorId" });
    this.hasMany(models.InvestorPayments, { foreignKey: "investorId" });
    this.hasMany(models.CampaignNotification, { foreignKey: "investorId" });
    this.hasMany(models.FavoriteCampaign, { foreignKey: "investorId" });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Investor.init(
    {
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
      sequelize,
      modelName: "Investor",
      tableName: "investors",
      timestamps: true,
      paranoid: true,
    }
  );

  return Investor;
};
