import { Model, Sequelize } from "sequelize";

interface AdminUserAttributes {
  adminUserId: string;
  name: string | null;
  email: string | null;
  password?: string | null;
  adminRoleId?: string;
}

export class AdminUser
  extends Model<AdminUserAttributes>
  implements AdminUserAttributes
{
  // These properties are explicitly declared for TypeScript's benefit.
  public adminUserId!: string;
  public name!: string | null;
  public email!: string | null;
  public password!: string | null;
  public adminRoleId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.AdminRole, {
      foreignKey: "adminRoleId",
      as: "role",
      onDelete: "cascade",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  AdminUser.init(
    {
      adminUserId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "AdminUser",
      tableName: "adminUsers",
      timestamps: true,
    }
  );

  return AdminUser;
};
