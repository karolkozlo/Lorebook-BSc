import { Model } from "sequelize";

const Event = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsToMany(models.Timeline, {
                through: models.TimelineEvent,
                foreignKey: 'Event_id'
            });
        }
    }
    Event.init(
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
            },
            year : {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true
                },
            },
            month : {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true,
                    min: 1,
                    max: 12
                },
            },
            day: {
                type: DataTypes.INTEGER,
            }
        },
        {
            sequelize,
            modelName: 'Event',
            timestamps: false,
            underscored: true,
        }
    );
    return Event;

};

export default Event;