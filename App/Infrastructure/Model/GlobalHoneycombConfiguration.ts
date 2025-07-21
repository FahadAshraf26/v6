import { Model, Sequelize } from "sequelize";

interface GlobalHoneycombConfigurationAttributes {
  globalHoneycombConfigurationId: string;
  configuration: any | null;
}

export class GlobalHoneycombConfiguration
  extends Model<GlobalHoneycombConfigurationAttributes>
  implements GlobalHoneycombConfigurationAttributes
{
  // These properties are explicitly declared for TypeScript's benefit.
  public globalHoneycombConfigurationId!: string;
  public configuration!: any | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  GlobalHoneycombConfiguration.init(
    {
      globalHoneycombConfigurationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      configuration: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "GlobalHoneycombConfiguration",
      tableName: "globalHoneycombConfigurations",
      timestamps: true,
      paranoid: true,
    }
  );

  return GlobalHoneycombConfiguration;
};
