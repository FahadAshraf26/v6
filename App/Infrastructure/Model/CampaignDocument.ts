import { Model, Sequelize } from "sequelize";

interface CampaignDocumentAttributes {
  campaignDocumentId: string;
  documentType: string;
  name: string;
  path: string;
  mimeType: string;
  ext: string | null;
}

export class CampaignDocument
  extends Model<CampaignDocumentAttributes>
  implements CampaignDocumentAttributes
{
  public campaignDocumentId!: string;
  public documentType!: string;
  public name!: string;
  public path!: string;
  public mimeType!: string;
  public ext!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignDocument.init(
    {
      campaignDocumentId: {
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
      modelName: "CampaignDocument",
      tableName: "campaignDocuments",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignDocument;
};
