import {
  Model,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";

// Interface for type-safety on instance attributes
interface CampaignQAAttributes {
  campaignQAId: string;
  type: string;
  text: string;
  parentId?: string | null; // Changed from required to optional
}

// Extend Sequelize's Model class and implement our attributes interface
export class CampaignQA
  extends Model<CampaignQAAttributes>
  implements CampaignQAAttributes
{
  // --- TYPE DEFINITIONS ---
  public campaignQAId!: string;
  public type!: string;
  public text!: string;
  public parentId!: string | null; // This can stay as is, as Sequelize will manage it

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly children?: CampaignQA[];
  public readonly parent?: CampaignQA;

  public getChildren!: HasManyGetAssociationsMixin<CampaignQA>;
  public getParent!: BelongsToGetAssociationMixin<CampaignQA>;

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    this.hasMany(this, {
      foreignKey: "parentId",
      as: "children",
    });

    this.belongsTo(this, {
      foreignKey: "parentId",
      as: "parent",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  CampaignQA.init(
    {
      // --- RUNTIME DEFINITIONS ---
      // No changes are needed here. 'parentId' is correctly omitted.
      campaignQAId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "CampaignQA",
      tableName: "campaignQAs",
      timestamps: true,
      paranoid: true,
    }
  );

  return CampaignQA;
};
