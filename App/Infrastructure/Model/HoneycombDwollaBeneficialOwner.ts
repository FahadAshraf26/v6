import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface HoneycombDwollaBeneficialOwnerAttributes {
  honeycombDwollaBeneficialOwnerId: string;
  dwollaBeneficialOwnerId: string;
  ownerId?: string;
  dwollaCustomerId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class HoneycombDwollaBeneficialOwner
  extends Model<HoneycombDwollaBeneficialOwnerAttributes>
  implements HoneycombDwollaBeneficialOwnerAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public honeycombDwollaBeneficialOwnerId!: string;
  public dwollaBeneficialOwnerId!: string;

  // Foreign Keys
  public ownerId!: string;
  public dwollaCustomerId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly owner?: any; // Replace 'any' with Owner class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.Owner, {
      foreignKey: "ownerId",
      as: "owner",
    });
    this.belongsTo(models.HoneycombDwollaCustomer, {
      foreignKey: "dwollaCustomerId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  HoneycombDwollaBeneficialOwner.init(
    {
      // --- RUNTIME DEFINITIONS ---
      honeycombDwollaBeneficialOwnerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      dwollaBeneficialOwnerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "HoneycombDwollaBeneficialOwner",
      tableName: "honeycombDwollaBeneficialOwners",
      timestamps: true,
      paranoid: true,
    }
  );

  return HoneycombDwollaBeneficialOwner;
};
