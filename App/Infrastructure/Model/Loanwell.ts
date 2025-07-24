import { Model, Sequelize } from "sequelize";

interface LoanwellAttributes {
  loanwellId: string;
  name: string;
  importedBy: string | null;
}

export class Loanwell
  extends Model<LoanwellAttributes>
  implements LoanwellAttributes
{
  public loanwellId!: string;
  public name!: string;
  public importedBy!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Loanwell.init(
    {
      loanwellId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      importedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Loanwell",
      tableName: "loanwells",
      timestamps: true,
      paranoid: true,
    }
  );

  return Loanwell;
};
