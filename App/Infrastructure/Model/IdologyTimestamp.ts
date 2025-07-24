import { Model, Sequelize } from "sequelize";

interface IdologyTimestampAttributes {
  idologyTimestampId: string;
  date: Date;
  isVerified: string;
  idologyIdNumber: string;
  idologyScanUrl: string | null;
  idologyScanUrlExpirationTime: Date | null;
  isResultMatched: boolean | null;
  badActorFlagged: boolean | null;
  ncResponse: any | null;
  userId?: string;
}

export class IdologyTimestamp
  extends Model<IdologyTimestampAttributes>
  implements IdologyTimestampAttributes
{
  public idologyTimestampId!: string;
  public date!: Date;
  public isVerified!: string;
  public idologyIdNumber!: string;
  public idologyScanUrl!: string | null;
  public idologyScanUrlExpirationTime!: Date | null;
  public isResultMatched!: boolean | null;
  public badActorFlagged!: boolean | null;
  public ncResponse!: any | null;

  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  IdologyTimestamp.init(
    {
      idologyTimestampId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idologyIdNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idologyScanUrl: {
        type: DataTypes.STRING,
      },
      idologyScanUrlExpirationTime: {
        type: DataTypes.DATE,
      },
      isResultMatched: {
        type: DataTypes.BOOLEAN,
      },
      badActorFlagged: {
        type: DataTypes.BOOLEAN,
      },
      ncResponse: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "IdologyTimestamp",
      tableName: "idologyTimestamps",
      timestamps: true,
      paranoid: true,
    }
  );

  return IdologyTimestamp;
};
