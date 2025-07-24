import { Model, Sequelize } from "sequelize";

interface ProfilePicAttributes {
  profilePicId: string;
  name: string;
  path: string;
  originalPath: string | null;
  mimeType: string;
}

export class ProfilePic
  extends Model<ProfilePicAttributes>
  implements ProfilePicAttributes
{
  public profilePicId!: string;
  public name!: string;
  public path!: string;
  public originalPath!: string | null;
  public mimeType!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: "userId" });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  ProfilePic.init(
    {
      profilePicId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      originalPath: {
        type: DataTypes.STRING,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProfilePic",
      tableName: "profilePics",
      timestamps: true,
      paranoid: true,
    }
  );

  return ProfilePic;
};
