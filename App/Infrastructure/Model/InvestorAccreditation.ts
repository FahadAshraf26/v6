import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface InvestorAccreditationAttributes {
  investorAccreditationId: string;
  accreditationStatus: string | null;
  submissionDate: Date | null;
  result: string | null;
  resultDate: Date | null;
  investorId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class InvestorAccreditation
  extends Model<InvestorAccreditationAttributes>
  implements InvestorAccreditationAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public investorAccreditationId!: string;
  public accreditationStatus!: string | null;
  public submissionDate!: Date | null;
  public result!: string | null;
  public resultDate!: Date | null;

  // Foreign Key
  public investorId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly investor?: any; // Replace 'any' with Investor class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    models.Investor.hasMany(this, {
      foreignKey: "investorId",
      as: "investorAccreditation",
    });

    this.belongsTo(models.Investor, {
      foreignKey: "investorId",
      as: "investor",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  InvestorAccreditation.init(
    {
      // --- RUNTIME DEFINITIONS ---
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
      // --- Model Options ---
      sequelize,
      modelName: "InvestorAccreditation",
      tableName: "investorAccreditations",
      timestamps: true,
      paranoid: true,
    }
  );

  return InvestorAccreditation;
};
