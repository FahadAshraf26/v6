import { Model, Sequelize } from "sequelize";
import EncryptionService from "../Service/EncryptionService/EncryptionService";

interface InvestorCardAttributes {
  investorCardId: string;
  creditCardName: string | null;
  cardType: string | null;
  lastFour: string | null;
  isStripeCard: boolean;
  creditCardNumber: string | null;
  expirationDate: string | null;
  cvvNumber: string | null;
  investorPaymentOptionsId?: string;
}

export class InvestorCard
  extends Model<InvestorCardAttributes>
  implements InvestorCardAttributes
{
  public investorCardId!: string;
  public creditCardName!: string | null;
  public cardType!: string | null;
  public lastFour!: string | null;
  public isStripeCard!: boolean;
  public creditCardNumber!: string | null;
  public expirationDate!: string | null;
  public cvvNumber!: string | null;

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
      if (this.creditCardNumber) {
        this.creditCardNumber = EncryptionService.encryptBankDetails(
          this.creditCardNumber
        );
      }
      if (this.expirationDate) {
        this.expirationDate = EncryptionService.encryptBankDetails(
          this.expirationDate
        );
      }
      if (this.cvvNumber) {
        this.cvvNumber = EncryptionService.encryptBankDetails(this.cvvNumber);
      }
    } catch (err) {
      console.error(err);
    }
  }

  public decrypt() {
    try {
      if (this.creditCardNumber) {
        this.creditCardNumber = EncryptionService.decryptBankDetails(
          this.creditCardNumber
        );
      }
      if (this.expirationDate) {
        this.expirationDate = EncryptionService.decryptBankDetails(
          this.expirationDate
        );
      }
      if (this.cvvNumber) {
        this.cvvNumber = EncryptionService.decryptBankDetails(this.cvvNumber);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  InvestorCard.init(
    {
      investorCardId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      creditCardName: { type: DataTypes.STRING },
      cardType: { type: DataTypes.STRING },
      lastFour: { type: DataTypes.STRING },
      isStripeCard: { type: DataTypes.BOOLEAN, defaultValue: false },
      creditCardNumber: { type: DataTypes.STRING },
      expirationDate: { type: DataTypes.STRING },
      cvvNumber: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "InvestorCard",
      tableName: "investorCards",
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate(investorCard: InvestorCard) {
          investorCard.encrypt();
        },
        beforeUpdate(investorCard: InvestorCard) {
          if (
            investorCard.changed("creditCardNumber") ||
            investorCard.changed("expirationDate") ||
            investorCard.changed("cvvNumber")
          ) {
            investorCard.encrypt();
          }
        },
        afterFind(result: InvestorCard | InvestorCard[] | null) {
          if (!result) return;
          if (Array.isArray(result)) {
            result.forEach((record) => record.decrypt());
          } else {
            result.decrypt();
          }
        },
      },
    }
  );

  return InvestorCard;
};
