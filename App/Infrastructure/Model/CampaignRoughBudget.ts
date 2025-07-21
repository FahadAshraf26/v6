import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface RoughBudgetAttributes {
  roughBudgetId: string;
  roughBudget: any | null; // Or a more specific type for your JSON structure
}

// Extend Sequelize's Model class and implement our attributes interface
export class RoughBudget
  extends Model<RoughBudgetAttributes>
  implements RoughBudgetAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public roughBudgetId!: string;
  public roughBudget!: any | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  RoughBudget.init(
    {
      // --- RUNTIME DEFINITIONS ---
      roughBudgetId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      roughBudget: {
        type: DataTypes.JSON,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "RoughBudget",
      tableName: "roughBudgets",
      timestamps: true,
      paranoid: true,
    }
  );

  return RoughBudget;
};
