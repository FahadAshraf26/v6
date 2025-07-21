import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface DwollaWebhookAttributes {
  dwollaWebhookId: string;
  eventId: string;
  topic: string;
  resourceId: string;
  status: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class DwollaWebhook
  extends Model<DwollaWebhookAttributes>
  implements DwollaWebhookAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public dwollaWebhookId!: string;
  public eventId!: string;
  public topic!: string;
  public resourceId!: string;
  public status!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  DwollaWebhook.init(
    {
      // --- RUNTIME DEFINITIONS ---
      dwollaWebhookId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resourceId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "DwollaWebhook",
      tableName: "dwollaWebhooks",
      timestamps: true,
    }
  );

  return DwollaWebhook;
};
