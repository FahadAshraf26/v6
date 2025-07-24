import { Model, Sequelize } from "sequelize";
interface ProjectionReturnsAttributes {
  projectionReturnsId: string;
  interest: number | null;
  principle: number | null;
  investorPaymentsId?: string;
}

export class ProjectionReturns
  extends Model<ProjectionReturnsAttributes>
  implements ProjectionReturnsAttributes
{
  public projectionReturnsId!: string;
  public interest!: number | null;
  public principle!: number | null;

  public investorPaymentsId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associate(models: any) {
    this.belongsTo(models.InvestorPayments, {
      foreignKey: "investorPaymentsId",
      as: "investorProjectionReturns",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  ProjectionReturns.init(
    {
      projectionReturnsId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      interest: {
        type: DataTypes.FLOAT,
      },
      principle: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "ProjectionReturns",
      tableName: "projectionReturns",
      timestamps: true,
      paranoid: true,
    }
  );

  return ProjectionReturns;
};
