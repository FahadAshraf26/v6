import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface EmployeeAttributes {
  employeeId: string;
  title: string;
  name: string;
  bio: string;
  facebook: string | null;
  linkedIn: string | null;
  twitter: string | null;
  instagram: string | null;
  website: string | null;
  profilePic: string | null;
  issuerId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class Employee
  extends Model<EmployeeAttributes>
  implements EmployeeAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public employeeId!: string;
  public title!: string;
  public name!: string;
  public bio!: string;
  public facebook!: string | null;
  public linkedIn!: string | null;
  public twitter!: string | null;
  public instagram!: string | null;
  public website!: string | null;
  public profilePic!: string | null;

  // Foreign Key
  public issuerId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    models.Issuer.hasMany(this, {
      foreignKey: "issuerId",
    });

    this.belongsTo(models.Issuer, {
      foreignKey: "issuerId",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  Employee.init(
    {
      // --- RUNTIME DEFINITIONS ---
      employeeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      bio: { type: DataTypes.TEXT, allowNull: false },
      facebook: { type: DataTypes.STRING, allowNull: true },
      linkedIn: { type: DataTypes.STRING, allowNull: true },
      twitter: { type: DataTypes.STRING, allowNull: true },
      instagram: { type: DataTypes.STRING, allowNull: true },
      website: { type: DataTypes.STRING, allowNull: true },
      profilePic: { type: DataTypes.STRING, allowNull: true },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "Employee",
      tableName: "employees",
      timestamps: true,
      paranoid: true,
    }
  );

  return Employee;
};
