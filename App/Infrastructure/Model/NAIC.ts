import { Model, Sequelize } from "sequelize";

interface NaicAttributes {
  naicId: number;
  code: string | null;
  title: string | null;
}

export class Naic extends Model<NaicAttributes> implements NaicAttributes {
  public naicId!: number;
  public code!: string | null;
  public title!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.hasMany(models.Issuer, { foreignKey: "naicId", as: "issuers" });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Naic.init(
    {
      naicId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Naic",
      tableName: "naics",
      timestamps: true,
      paranoid: true,
    }
  );

  return Naic;
};
