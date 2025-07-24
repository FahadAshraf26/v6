import { Model, Sequelize } from "sequelize";

interface AdminRoleAttributes {
  adminRoleId: string;
  name: string | null;
}

export class AdminRole
  extends Model<AdminRoleAttributes>
  implements AdminRoleAttributes
{
  public adminRoleId!: string;
  public name!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    this.hasMany(models.AdminUser, {
      foreignKey: "adminRoleId",
      as: "adminUsers",
      onDelete: "cascade",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  AdminRole.init(
    {
      adminRoleId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "AdminRole",
      tableName: "adminRoles",
      timestamps: true,
    }
  );

  return AdminRole;
};
