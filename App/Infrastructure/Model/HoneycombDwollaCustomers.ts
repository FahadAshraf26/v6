import {
  Model,
  DataTypes,
  Sequelize,
  HasOneGetAssociationMixin,
} from "sequelize";

// Interface for type-safety on instance attributes
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

// Extend Sequelize's Model class and implement our attributes interface
export class HoneycombDwollaCustomer
  extends Model<HoneycombDwollaCustomerAttributes>
  implements HoneycombDwollaCustomerAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public honeycombDwollaCustomerId!: string | null;
  public dwollaCustomerId!: string;
  public customerType!: string | null;
  public isController!: boolean;
  public isAccountAdmin!: boolean;
  public dwollaBalanceId!: string | null;
  public dwollaDocumentId!: string | null;

  // Foreign Keys
  public userId!: string;
  public issuerId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association mixin methods ---
  public getHoneycombDwollaBeneficialOwner!: HasOneGetAssociationMixin<any>; // Replace 'any' with HoneycombDwollaBeneficialOwner class

  // --- STATIC ASSOCIATE METHOD ---
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

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  HoneycombDwollaCustomer.init(
    {
      // --- RUNTIME DEFINITIONS ---
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
      // --- Model Options ---
      sequelize,
      modelName: "HoneycombDwollaCustomer",
      tableName: "honeycombDwollaCustomers",
      timestamps: true,
      paranoid: true,
    }
  );

  return HoneycombDwollaCustomer;
};
