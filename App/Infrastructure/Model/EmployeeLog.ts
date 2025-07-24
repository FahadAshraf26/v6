import { Model, Sequelize } from "sequelize";

interface EmployeeLogAttributes {
  employeeLogId: string;
  employeeCount: number | null;
  updatedEmployeeCount: number | null;
  issuerId?: string;
}

export class EmployeeLog
  extends Model<EmployeeLogAttributes>
  implements EmployeeLogAttributes
{
  public employeeLogId!: string;
  public employeeCount!: number | null;
  public updatedEmployeeCount!: number | null;

  public issuerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  EmployeeLog.init(
    {
      employeeLogId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      employeeCount: {
        type: DataTypes.INTEGER,
      },
      updatedEmployeeCount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "EmployeeLog",
      tableName: "employeeLogs",
      timestamps: true,
      paranoid: true,
    }
  );

  return EmployeeLog;
};
