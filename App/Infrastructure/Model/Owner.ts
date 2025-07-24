import { Model, Sequelize } from "sequelize";

interface OwnerAttributes {
  ownerId: string;
  title: string;
  subTitle: string | null;
  description: string;
  primaryOwner: boolean;
  beneficialOwner: boolean;
  beneficialOwnerId: string | null;
  businessOwner: boolean | null;
}

export class Owner extends Model<OwnerAttributes> implements OwnerAttributes {
  public ownerId!: string;
  public title!: string;
  public subTitle!: string | null;
  public description!: string;
  public primaryOwner!: boolean;
  public beneficialOwner!: boolean;
  public beneficialOwnerId!: string | null;
  public businessOwner!: boolean | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsToMany(models.Issuer, {
      through: models.IssuerOwner,
      as: "issuers",
      foreignKey: "ownerId",
    });

    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });

    this.hasOne(models.HoneycombDwollaBeneficialOwner, {
      foreignKey: "ownerId",
      as: "dwollaBeneficialOwner",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Owner.init(
    {
      ownerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subTitle: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      primaryOwner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      beneficialOwner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      beneficialOwnerId: {
        type: DataTypes.STRING,
      },
      businessOwner: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Owner",
      tableName: "owners",
      timestamps: true,
      paranoid: true,
    }
  );

  return Owner;
};
