import { Model, Sequelize } from "sequelize";
import EncryptionService from "../Service/EncryptionService/EncryptionService";
interface IssuerBankAttributes {
  issuerBankId: string;
  accountType: string | null;
  dwollaSourceId: string | null;
  accountName: string | null;
  lastFour: string | null;
  accountNumber: string | null;
  routingNumber: string | null;
  isForRepayment: boolean | null;
  accountOwner: string | null;
  bankToken: string | null;
  wireRoutingNumber: string | null;
  issuerId?: string;
}

export class IssuerBank
  extends Model<IssuerBankAttributes>
  implements IssuerBankAttributes
{
  public issuerBankId!: string;
  public accountType!: string | null;
  public dwollaSourceId!: string | null;
  public accountName!: string | null;
  public lastFour!: string | null;
  public accountNumber!: string | null;
  public routingNumber!: string | null;
  public isForRepayment!: boolean | null;
  public accountOwner!: string | null;
  public bankToken!: string | null;
  public wireRoutingNumber!: string | null;

  public issuerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Issuer, { foreignKey: "issuerId" });
    this.hasOne(models.DwollaFundingSourceVerification, {
      foreignKey: "dwollaSourceId",
    });
  }

  private encrypt() {
    try {
      if (this.routingNumber) {
        this.routingNumber = EncryptionService.encryptBankDetails(
          this.routingNumber
        );
      }
      if (this.accountNumber) {
        this.accountNumber = EncryptionService.encryptBankDetails(
          this.accountNumber
        );
      }
      if (this.wireRoutingNumber) {
        this.wireRoutingNumber = EncryptionService.encryptBankDetails(
          this.wireRoutingNumber
        );
      }
    } catch (e) {
      console.error("Encryption failed:", e);
    }
  }

  private decrypt() {
    try {
      if (this.routingNumber) {
        this.routingNumber = EncryptionService.decryptBankDetails(
          this.routingNumber
        );
      }
      if (this.accountNumber) {
        this.accountNumber = EncryptionService.decryptBankDetails(
          this.accountNumber
        );
      }
      if (this.wireRoutingNumber) {
        this.wireRoutingNumber = EncryptionService.decryptBankDetails(
          this.wireRoutingNumber
        );
      }
    } catch (e) {
      console.error("Decryption failed:", e);
    }
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  IssuerBank.init(
    {
      issuerBankId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      accountType: { type: DataTypes.STRING, allowNull: true },
      dwollaSourceId: { type: DataTypes.STRING },
      accountName: { type: DataTypes.STRING, allowNull: true },
      lastFour: { type: DataTypes.STRING, allowNull: true },
      accountNumber: { type: DataTypes.STRING, allowNull: true },
      routingNumber: { type: DataTypes.STRING, allowNull: true },
      isForRepayment: { type: DataTypes.BOOLEAN },
      accountOwner: { type: DataTypes.STRING },
      bankToken: { type: DataTypes.STRING },
      wireRoutingNumber: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "IssuerBank",
      tableName: "issuerBanks",
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate(issuerBank: IssuerBank) {
          issuerBank["encrypt"]();
        },
        beforeUpdate(issuerBank: IssuerBank) {
          if (
            issuerBank.changed("routingNumber") ||
            issuerBank.changed("accountNumber") ||
            issuerBank.changed("wireRoutingNumber")
          ) {
            issuerBank["encrypt"]();
          }
        },
        afterFind(result: IssuerBank | IssuerBank[] | null) {
          if (!result) return;
          if (Array.isArray(result)) {
            for (const record of result) {
              record["decrypt"]();
            }
          } else {
            result["decrypt"]();
          }
        },
      },
    }
  );

  return IssuerBank;
};
