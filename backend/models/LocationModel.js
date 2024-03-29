import { Model } from "sequelize";

const Location = (sequelize, DataTypes) => {
    class Location extends Model {
        static associate(models) {
            Location.belongsTo(models.Universe, {
                foreignKey: "Universe_id",
                onDelete: "CASCADE"
            });
            Location.hasMany(models.Location, {
                foreignKey: "Location_id",
                onDelete: "SET NULL"
            });
            Location.belongsTo(models.Location, {
                foreignKey: "Location_id",
                onDelete: "SET NULL"
            });
            Location.hasOne(models.Content, {
                foreignKey: "Location_id",
                onDelete: "CASCADE"
            });
            Location.hasMany(models.Link, {
                foreignKey: "Location_id",
                onDelete: "CASCADE"
            });
        }
    }
    Location.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            last_modified: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Location',
            timestamps: false,
            underscored: true,
            tableName: 'locations'
        }
    );
    return Location;

};

export default Location;