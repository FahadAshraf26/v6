import { Model, Sequelize } from "sequelize";

interface IssuerOwnerAttributes {
  issuerOwnerId: string;
  remarks: string | null;
  issuerId?: string;
  ownerId?: string;
}

export class IssuerOwner
  extends Model<IssuerOwnerAttributes>
  implements IssuerOwnerAttributes
{
  public issuerOwnerId!: string;
  public remarks!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // This is a junction table model. The associations involving it
  // (e.g., Issuer.belongsToMany(Owner, { through: IssuerOwner }))
  // are defined in the models that it connects.
  // Therefore, a static 'associate' method is not needed here.
}

export default (sequelize: Sequelize, DataTypes: any) => {
  IssuerOwner.init(
    {
      issuerOwnerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "IssuerOwner",
      tableName: "issuerOwners",
      timestamps: true,
      paranoid: true,
    }
  );

  return IssuerOwner;
};
