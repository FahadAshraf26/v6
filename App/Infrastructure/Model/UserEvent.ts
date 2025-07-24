import { Model, Sequelize } from "sequelize";
interface UserEventAttributes {
  userEventId: string;
  type: string;
  parentId?: string | null;
  userId?: string;
}

export class UserEvent
  extends Model<UserEventAttributes>
  implements UserEventAttributes
{
  public userEventId!: string;
  public type!: string;

  public parentId!: string | null;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(this, {
      foreignKey: "parentId",
      as: "parentEvent",
    });
    this.hasMany(this, {
      foreignKey: "parentId",
      as: "childEvents",
    });

    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  UserEvent.init(
    {
      userEventId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserEvent",
      tableName: "userEvents",
      timestamps: true,
      paranoid: true,
    }
  );

  return UserEvent;
};
