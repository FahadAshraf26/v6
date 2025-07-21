import { Model, Sequelize } from "sequelize";

interface EntityIntermediaryAttributes {
  entityIntermediaryId: string;
  operatorAgreementApproved: boolean;
  intermediaryName: string;
  userId?: string;
  issuerId?: string;
}

export class EntityIntermediary
  extends Model<EntityIntermediaryAttributes>
  implements EntityIntermediaryAttributes
{
  // These properties are explicitly declared for TypeScript's benefit.
  public entityIntermediaryId!: string;
  public operatorAgreementApproved!: boolean;
  public intermediaryName!: string;
  public userId!: string;
  public issuerId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });
    // this.belongsTo(models.Issuer, {
    //   foreignKey: "issuerId",
    // });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  EntityIntermediary.init(
    {
      entityIntermediaryId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      operatorAgreementApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      intermediaryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      sequelize,
      modelName: "EntityIntermediary",
      tableName: "entityIntermediaries",
      timestamps: true,
      paranoid: true,
    }
  );

  return EntityIntermediary;
};
