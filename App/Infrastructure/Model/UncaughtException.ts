import { Model, Sequelize } from "sequelize";

interface UncaughtExceptionAttributes {
  uncaughtExceptionId: string;
  message: string;
  type: string;
  data: any;
}

export class UncaughtException
  extends Model<UncaughtExceptionAttributes>
  implements UncaughtExceptionAttributes
{
  // These properties are explicitly declared for TypeScript's benefit.
  public uncaughtExceptionId!: string;
  public message!: string;
  public type!: string;
  public data!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  UncaughtException.init(
    {
      uncaughtExceptionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UncaughtException",
      tableName: "uncaughtExceptions",
      timestamps: true,
      paranoid: true,
    }
  );

  return UncaughtException;
};
