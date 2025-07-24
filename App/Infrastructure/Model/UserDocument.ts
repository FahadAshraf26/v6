import { Model, Sequelize } from "sequelize";

interface UserDocumentAttributes {
  userDocumentId: string;
  documentType: string;
  name: string;
  path: string;
  mimeType: string;
  ext: string | null;
  year: number | null;
  campaignId: string | null;
}

export class UserDocument
  extends Model<UserDocumentAttributes>
  implements UserDocumentAttributes
{
  public userDocumentId!: string;
  public documentType!: string;
  public name!: string;
  public path!: string;
  public mimeType!: string;
  public ext!: string | null;
  public year!: number | null;
  public campaignId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: "userId" });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  UserDocument.init(
    {
      userDocumentId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      documentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ext: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      campaignId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserDocument",
      tableName: "userDocuments",
      timestamps: true,
      paranoid: true,
    }
  );

  return UserDocument;
};
