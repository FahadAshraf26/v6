import { Model, Sequelize } from "sequelize";

interface RepaymentsUpdateAttributes {
  repaymentsUpdateId: string;
}

export class RepaymentsUpdate
  extends Model<RepaymentsUpdateAttributes>
  implements RepaymentsUpdateAttributes
{
  public repaymentsUpdateId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  RepaymentsUpdate.init(
    {
      repaymentsUpdateId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RepaymentsUpdate",
      tableName: "repaymentsUpdates",
      timestamps: true,
      paranoid: true,
    }
  );

  return RepaymentsUpdate;
};
