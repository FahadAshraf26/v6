import { Model, Sequelize } from "sequelize";

interface IssuerAttributes {
  issuerId: string;
  issuerName: string;
  physicalAddress: string;
  website: string | null;
  businessType: string;
  legalEntityType: string;
  description: string | null;
  facebook: string | null;
  linkedIn: string | null;
  twitter: string | null;
  instagram: string | null;
  pinterest: string | null;
  reddit: string | null;
  email: string;
  EIN: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phoneNumber: string | null;
  latitude: string | null;
  longitude: string | null;
  previousName: string | null;
  ncIssuerId: string | null;
  country: string | null;
  naicId?: string;
}

export class Issuer
  extends Model<IssuerAttributes>
  implements IssuerAttributes
{
  public issuerId!: string;
  public issuerName!: string;
  public physicalAddress!: string;
  public website!: string | null;
  public businessType!: string;
  public legalEntityType!: string;
  public description!: string | null;
  public facebook!: string | null;
  public linkedIn!: string | null;
  public twitter!: string | null;
  public instagram!: string | null;
  public pinterest!: string | null;
  public reddit!: string | null;
  public email!: string;
  public EIN!: string | null;
  public city!: string | null;
  public state!: string | null;
  public zipCode!: string | null;
  public phoneNumber!: string | null;
  public latitude!: string | null;
  public longitude!: string | null;
  public previousName!: string | null;
  public ncIssuerId!: string | null;
  public country!: string | null;

  public naicId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Naic, { foreignKey: "naicId", as: "naic" });
    this.belongsToMany(models.Owner, {
      through: models.IssuerOwner,
      as: "owners",
      foreignKey: "issuerId",
    });
    this.hasMany(models.IssuerBank, {
      foreignKey: "issuerId",
      as: "issuerBank",
    });
    this.hasMany(models.IssuerDocument, { foreignKey: "issuerId" });
    this.hasMany(models.EntityIntermediary, { foreignKey: "issuerId" });
    this.hasMany(models.HoneycombDwollaConsent, { foreignKey: "issuerId" });
    this.hasMany(models.HoneycombDwollaCustomer, { foreignKey: "issuerId" });
    this.hasMany(models.DwollaPostTransactions, { foreignKey: "issuerId" });
    this.hasMany(models.EmployeeLog, {
      foreignKey: "issuerId",
      as: "employeeLog",
    });
    this.hasMany(models.DwollaCustodyTransferHistory, {
      foreignKey: "issuerId",
      constraints: false,
    });

    // models.EntityCampaignFund.hasMany(this, {
    //   as: 'entity',
    //   foreignKey: 'issuerId',
    // });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Issuer.init(
    {
      issuerId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      issuerName: { type: DataTypes.STRING, allowNull: false },
      physicalAddress: { type: DataTypes.STRING, allowNull: false },
      website: { type: DataTypes.STRING },
      businessType: { type: DataTypes.STRING, allowNull: false },
      legalEntityType: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      facebook: { type: DataTypes.STRING },
      linkedIn: { type: DataTypes.STRING },
      twitter: { type: DataTypes.STRING },
      instagram: { type: DataTypes.STRING },
      pinterest: { type: DataTypes.STRING },
      reddit: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false, unique: false },
      EIN: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      state: { type: DataTypes.STRING },
      zipCode: { type: DataTypes.STRING },
      phoneNumber: { type: DataTypes.STRING },
      latitude: { type: DataTypes.STRING },
      longitude: { type: DataTypes.STRING },
      previousName: { type: DataTypes.STRING },
      ncIssuerId: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Issuer",
      tableName: "issuers",
      timestamps: true,
      paranoid: true,
    }
  );

  return Issuer;
};
