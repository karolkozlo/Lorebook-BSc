import { Model } from "sequelize";

const Story = (sequelize, DataTypes) => {
    class Story extends Model {
        static associate(models) {
            Story.belongsTo(models.Universe, {
                foreignKey: "Universe_id",
                onDelete: "CASCADE"
            });
        }
    }
    Story.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(500),
            }
        },
        {
            sequelize,
            modelName: 'Story',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'stories',
        }
    );
    return Story;

};

export default Story;