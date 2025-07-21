import {
  Model,
  DataTypes,
  Sequelize,
  HasOneGetAssociationMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";

// Interface for type-safety on instance attributes
interface ChargeAttributes {
  chargeId: string;
  chargeType: string | null;
  dwollaChargeId: string;
  chargeStatus: string;
  applicationFee: string | null;
  refunded: boolean | null;
  refundRequestDate: Date | null;
  referenceNumber: string | null;
  documentSent: Date | null;
  refundChargeId?: string | null; // Self-referencing foreign key
}

// Extend Sequelize's Model class and implement our attributes interface
export class Charge
  extends Model<ChargeAttributes>
  implements ChargeAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public chargeId!: string;
  public chargeType!: string | null;
  public dwollaChargeId!: string;
  public chargeStatus!: string;
  public applicationFee!: string | null;
  public refunded!: boolean | null;
  public refundRequestDate!: Date | null;
  public referenceNumber!: string | null;
  public documentSent!: Date | null;

  // Foreign Key
  public refundChargeId!: string | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly parentCharge?: Charge;
  public readonly refund?: Charge;

  // --- Association mixin methods ---
  public getParentCharge!: HasOneGetAssociationMixin<Charge>;
  public getRefund!: BelongsToGetAssociationMixin<Charge>;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.hasOne(this, {
      foreignKey: "refundChargeId",
      as: "parentCharge",
    });

    this.belongsTo(this, {
      foreignKey: "refundChargeId",
      as: "refund",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  Charge.init(
    {
      // --- RUNTIME DEFINITIONS ---
      chargeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      chargeType: {
        type: DataTypes.STRING,
      },
      dwollaChargeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chargeStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicationFee: {
        type: DataTypes.STRING,
      },
      refunded: {
        type: DataTypes.BOOLEAN,
      },
      refundRequestDate: {
        type: DataTypes.DATE,
      },
      refundChargeId: {
        type: DataTypes.STRING,
      },
      referenceNumber: {
        type: DataTypes.STRING,
      },
      documentSent: {
        type: DataTypes.DATE,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "Charge",
      tableName: "charges",
      timestamps: true,
      paranoid: true,
    }
  );

  return Charge;
};
