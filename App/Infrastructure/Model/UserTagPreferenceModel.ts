import { Model, Sequelize } from "sequelize";
interface UserTagPreferenceAttributes {
  userTagPreferenceId: string;
  userId: string;
  tagId: string;
}

export class UserTagPreference
  extends Model<UserTagPreferenceAttributes>
  implements UserTagPreferenceAttributes
{
  public userTagPreferenceId!: string;
  public userId!: string;
  public tagId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    this.belongsTo(models.Tag, {
      foreignKey: "tagId",
      as: "tag",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  UserTagPreference.init(
    {
      userTagPreferenceId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
      },
      tagId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "tags",
          key: "tagId",
        },
      },
    },
    {
      sequelize,
      modelName: "UserTagPreference",
      tableName: "userTagPreferences",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "tagId"],
        },
        {
          fields: ["userId"],
        },
        {
          fields: ["tagId"],
        },
      ],
    }
  );

  return UserTagPreference;
};
