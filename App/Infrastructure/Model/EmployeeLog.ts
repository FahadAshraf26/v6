import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface EmployeeLogAttributes {
  employeeLogId: string;
  employeeCount: number | null;
  updatedEmployeeCount: number | null;
  issuerId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class EmployeeLog
  extends Model<EmployeeLogAttributes>
  implements EmployeeLogAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public employeeLogId!: string;
  public employeeCount!: number | null;
  public updatedEmployeeCount!: number | null;

  // Foreign Key
  public issuerId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  EmployeeLog.init(
    {
      // --- RUNTIME DEFINITIONS ---
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
      // --- Model Options ---
      sequelize,
      modelName: "EmployeeLog",
      tableName: "employeeLogs",
      timestamps: true,
      paranoid: true,
    }
  );

  return EmployeeLog;
};
