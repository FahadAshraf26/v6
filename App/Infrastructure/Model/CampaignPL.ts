import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface PLAttributes {
  plId: string;
  pl: any | null; // Or a more specific type for your JSON structure
}

// Extend Sequelize's Model class and implement our attributes interface
export class PL extends Model<PLAttributes> implements PLAttributes {
  // --- TYPE DEFINITIONS (The Update) ---
  public plId!: string;
  public pl!: any | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  PL.init(
    {
      // --- RUNTIME DEFINITIONS ---
      plId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      pl: {
        type: DataTypes.JSON,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "PL",
      tableName: "PLs",
      timestamps: true,
      paranoid: true,
    }
  );

  return PL;
};
