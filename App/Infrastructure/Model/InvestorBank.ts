import { Model } from "sequelize";
import EncryptionService from "../Service/EncryptionService/EncryptionService";

interface InvestorBankAttributes {
  investorBankId: string;
  bankToken: string | null;
  accountType: string | null;
  accountName: string | null;
  lastFour: string | null;
  accountNumber: string | null;
  routingNumber: string | null;
  wireRoutingNumber: string | null;
  bankName: string | null;
  dwollaFundingSourceId: string | null;
  investorPaymentOptionsId?: string;
}

export class InvestorBank
  extends Model<InvestorBankAttributes>
  implements InvestorBankAttributes
{
  public investorBankId!: string;
  public bankToken!: string | null;
  public accountType!: string | null;
  public accountName!: string | null;
  public lastFour!: string | null;
  public accountNumber!: string | null;
  public routingNumber!: string | null;
  public wireRoutingNumber!: string | null;
  public bankName!: string | null;
  public dwollaFundingSourceId!: string | null;

  public investorPaymentOptionsId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.InvestorPaymentOption, {
      foreignKey: "investorPaymentOptionsId",
    });
  }

  public encrypt() {
    try {
      if (this.routingNumber && this.routingNumber.trim().length > 0) {
        this.routingNumber = EncryptionService.encryptBankDetails(
          this.routingNumber
        );
      }
      if (this.accountNumber && this.accountNumber.trim().length > 0) {
        this.accountNumber = EncryptionService.encryptBankDetails(
          this.accountNumber
        );
      }
      if (this.wireRoutingNumber && this.wireRoutingNumber.trim().length > 0) {
        this.wireRoutingNumber = EncryptionService.encryptBankDetails(
          this.wireRoutingNumber
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  public decrypt() {
    try {
      if (this.routingNumber && this.routingNumber.trim().length > 0) {
        this.routingNumber = EncryptionService.decryptBankDetails(
          this.routingNumber
        );
      }
      if (this.accountNumber && this.accountNumber.trim().length > 0) {
        this.accountNumber = EncryptionService.decryptBankDetails(
          this.accountNumber
        );
      }
      if (this.wireRoutingNumber && this.wireRoutingNumber.trim().length > 0) {
        this.wireRoutingNumber = EncryptionService.decryptBankDetails(
          this.wireRoutingNumber
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default (sequelize: any, DataTypes: any) => {
  InvestorBank.init(
    {
      investorBankId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      bankToken: { type: DataTypes.STRING, allowNull: true },
      accountType: { type: DataTypes.STRING, allowNull: true },
      accountName: { type: DataTypes.STRING, allowNull: true },
      lastFour: { type: DataTypes.STRING, allowNull: true },
      accountNumber: { type: DataTypes.STRING, allowNull: true },
      routingNumber: { type: DataTypes.STRING, allowNull: true },
      wireRoutingNumber: { type: DataTypes.STRING, allowNull: true },
      bankName: { type: DataTypes.STRING, allowNull: true },
      dwollaFundingSourceId: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "InvestorBank",
      tableName: "investorBanks",
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate(investorBank: InvestorBank) {
          investorBank.encrypt();
        },
        beforeUpdate(investorBank: InvestorBank) {
          if (
            investorBank.changed("routingNumber") ||
            investorBank.changed("accountNumber") ||
            investorBank.changed("wireRoutingNumber")
          ) {
            investorBank.encrypt();
          }
        },
        afterFind(result: InvestorBank | InvestorBank[] | null) {
          if (!result) return;
          if (Array.isArray(result)) {
            for (const record of result) {
              record.decrypt();
            }
          } else {
            result.decrypt();
          }
        },
      },
    }
  );

  return InvestorBank;
};
