import { Model, Sequelize, HasOneGetAssociationMixin } from "sequelize";

interface HoneycombDwollaCustomerAttributes {
  honeycombDwollaCustomerId: string | null;
  dwollaCustomerId: string;
  customerType: string | null;
  isController: boolean;
  isAccountAdmin: boolean;
  dwollaBalanceId: string | null;
  dwollaDocumentId: string | null;
  userId?: string;
  issuerId?: string;
}

export class HoneycombDwollaCustomer
  extends Model<HoneycombDwollaCustomerAttributes>
  implements HoneycombDwollaCustomerAttributes
{
  public honeycombDwollaCustomerId!: string | null;
  public dwollaCustomerId!: string;
  public customerType!: string | null;
  public isController!: boolean;
  public isAccountAdmin!: boolean;
  public dwollaBalanceId!: string | null;
  public dwollaDocumentId!: string | null;

  public userId!: string;
  public issuerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public getHoneycombDwollaBeneficialOwner!: HasOneGetAssociationMixin<any>; // Replace 'any' with HoneycombDwollaBeneficialOwner class

  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });

    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });

    this.hasOne(models.HoneycombDwollaBeneficialOwner, {
      foreignKey: "dwollaCustomerId",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  HoneycombDwollaCustomer.init(
    {
      honeycombDwollaCustomerId: {
        type: DataTypes.STRING,
      },
      dwollaCustomerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      customerType: {
        type: DataTypes.STRING,
      },
      isController: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAccountAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dwollaBalanceId: {
        type: DataTypes.STRING,
      },
      dwollaDocumentId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "HoneycombDwollaCustomer",
      tableName: "honeycombDwollaCustomers",
      timestamps: true,
      paranoid: true,
    }
  );

  return HoneycombDwollaCustomer;
};
