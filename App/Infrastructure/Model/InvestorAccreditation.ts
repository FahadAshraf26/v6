import { Model, Sequelize } from "sequelize";

interface InvestorAccreditationAttributes {
  investorAccreditationId: string;
  accreditationStatus: string | null;
  submissionDate: Date | null;
  result: string | null;
  resultDate: Date | null;
  investorId?: string;
}

export class InvestorAccreditation
  extends Model<InvestorAccreditationAttributes>
  implements InvestorAccreditationAttributes
{
  public investorAccreditationId!: string;
  public accreditationStatus!: string | null;
  public submissionDate!: Date | null;
  public result!: string | null;
  public resultDate!: Date | null;

  public investorId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.Investor, {
      foreignKey: "investorId",
      as: "investorAccreditation",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  InvestorAccreditation.init(
    {
      investorAccreditationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      accreditationStatus: { type: DataTypes.STRING },
      submissionDate: { type: DataTypes.DATEONLY },
      result: { type: DataTypes.STRING },
      resultDate: { type: DataTypes.DATEONLY },
    },
    {
      sequelize,
      modelName: "InvestorAccreditation",
      tableName: "investorAccreditations",
      timestamps: true,
      paranoid: true,
    }
  );

  return InvestorAccreditation;
};
