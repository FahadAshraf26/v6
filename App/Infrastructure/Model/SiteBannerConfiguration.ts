import { Model, Sequelize } from "sequelize";

interface SiteBannerConfigurationAttributes {
  siteBannerConfigurationId: string;
  configuration: any | null;
}

export class SiteBannerConfiguration
  extends Model<SiteBannerConfigurationAttributes>
  implements SiteBannerConfigurationAttributes
{
  public siteBannerConfigurationId!: string;
  public configuration!: any | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  SiteBannerConfiguration.init(
    {
      siteBannerConfigurationId: {
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
      modelName: "SiteBannerConfiguration",
      tableName: "siteBannerConfigurations",
      timestamps: true,
      paranoid: true,
    }
  );

  return SiteBannerConfiguration;
};
