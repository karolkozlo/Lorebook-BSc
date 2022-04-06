import { Model } from "sequelize";

const Timeline = (sequelize, DataTypes) => {
    class Timeline extends Model {
        static associate(models) {
            Timeline.belongsTo(models.Universe, {
                foreignKey: "Universe_id"
            });
        }
    }
    Timeline.init(
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
        },
        {
            sequelize,
            modelName: 'Timeline',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'timelines',
        }
    );
    return Timeline;

};

export default Timeline;