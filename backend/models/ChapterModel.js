import { Model } from "sequelize";

const Chapter = (sequelize, DataTypes) => {
    class Chapter extends Model {
        static associate(models) {
            Chapter.belongsTo(models.Story, {
                foreignKey: "Story_id",
                onDelete: "CASCADE"
            });
            Chapter.hasMany(models.Link, {
                foreignKey: "Chapter_id",
                onDelete: "CASCADE"
            });
        }
    }
    Chapter.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ordinal_number: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            text: {
                type: DataTypes.JSON,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Chapter',
            timestamps: false,
            underscored: true,
        }
    );
    return Chapter;

};

export default Chapter;