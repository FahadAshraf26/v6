import { Model, DataTypes, Sequelize } from "sequelize";

// Interface for type-safety on instance attributes
interface IdologyTimestampAttributes {
  idologyTimestampId: string;
  date: Date;
  isVerified: string;
  idologyIdNumber: string;
  idologyScanUrl: string | null;
  idologyScanUrlExpirationTime: Date | null;
  isResultMatched: boolean | null;
  badActorFlagged: boolean | null;
  ncResponse: any | null; // Or a more specific type for your JSON structure
  userId?: string;
}

// Extend Sequelize's Model class and implement our attributes interface
export class IdologyTimestamp
  extends Model<IdologyTimestampAttributes>
  implements IdologyTimestampAttributes
{
  // --- TYPE DEFINITIONS (The Update) ---
  public idologyTimestampId!: string;
  public date!: Date;
  public isVerified!: string;
  public idologyIdNumber!: string;
  public idologyScanUrl!: string | null;
  public idologyScanUrlExpirationTime!: Date | null;
  public isResultMatched!: boolean | null;
  public badActorFlagged!: boolean | null;
  public ncResponse!: any | null;

  // Foreign Key
  public userId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // --- Association-related property declarations ---
  public readonly user?: any; // Replace 'any' with User class

  // --- STATIC ASSOCIATE METHOD ---
  public static associate(models: any) {
    models.User.hasMany(this, {
      foreignKey: "userId",
      as: "idologyTimestamps",
    });

    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

// The exported initialization function
export default (sequelize: Sequelize, DataTypes: any) => {
  IdologyTimestamp.init(
    {
      // --- RUNTIME DEFINITIONS ---
      idologyTimestampId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idologyIdNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idologyScanUrl: {
        type: DataTypes.STRING,
      },
      idologyScanUrlExpirationTime: {
        type: DataTypes.DATE,
      },
      isResultMatched: {
        type: DataTypes.BOOLEAN,
      },
      badActorFlagged: {
        type: DataTypes.BOOLEAN,
      },
      ncResponse: {
        type: DataTypes.JSON,
      },
    },
    {
      // --- Model Options ---
      sequelize,
      modelName: "IdologyTimestamp",
      tableName: "idologyTimestamps",
      timestamps: true,
      paranoid: true,
    }
  );

  return IdologyTimestamp;
};
