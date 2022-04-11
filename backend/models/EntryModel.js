import { Model } from "sequelize";

const Entry = (sequelize, DataTypes) => {
    class Entry extends Model {
        static associate(models) {
            Entry.belongsTo(models.Category, {
                foreignKey: "Category_id",
                onDelete: "CASCADE"
            });
            Entry.hasOne(models.Content, {
                foreignKey: "Entry_id",
                onDelete: "CASCADE"
            });
        }
    }
    Entry.init(
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
            modelName: 'Entry',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'entries',
        }
    );
    return Entry;

};

export default Entry;