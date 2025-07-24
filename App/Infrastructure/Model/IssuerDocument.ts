import { Model, Sequelize } from "sequelize";

interface IssuerDocumentAttributes {
  issuerDocumentId: string;
  documentType: string;
  name: string;
  path: string;
  mimeType: string;
  ext: string | null;
}

export class IssuerDocument
  extends Model<IssuerDocumentAttributes>
  implements IssuerDocumentAttributes
{
  public issuerDocumentId!: string;
  public documentType!: string;
  public name!: string;
  public path!: string;
  public mimeType!: string;
  public ext!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Issuer, { foreignKey: "issuerId" });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  IssuerDocument.init(
    {
      issuerDocumentId: {
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
    },
    {
      sequelize,
      modelName: "IssuerDocument",
      tableName: "issuerDocuments",
      timestamps: true,
      paranoid: true,
    }
  );

  return IssuerDocument;
};
