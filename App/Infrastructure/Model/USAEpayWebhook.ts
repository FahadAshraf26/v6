import { Model, Sequelize } from "sequelize";

interface UsaEpayWebhookAttributes {
  webhookId: string;
  webhookType: string | null;
  status: string | null;
  payload: any | null;
}

export class UsaEpayWebhook
  extends Model<UsaEpayWebhookAttributes>
  implements UsaEpayWebhookAttributes
{
  // These properties are explicitly declared for TypeScript's benefit.
  public webhookId!: string;
  public webhookType!: string | null;
  public status!: string | null;
  public payload!: any | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  UsaEpayWebhook.init(
    {
      webhookId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      webhookType: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      payload: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "UsaEpayWebhook",
      tableName: "usaEpayWebhooks",
      timestamps: true,
      paranoid: true,
    }
  );

  return UsaEpayWebhook;
};
