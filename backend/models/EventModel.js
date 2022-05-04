import { Model } from "sequelize";

const Event = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsTo(models.Universe, {
                foreignKey: "Universe_id"
            });
            Event.belongsToMany(models.Timeline, {
                through: models.TimelineEvent,
                foreignKey: 'Event_id'
            });
            Event.hasOne(models.Content, {
                foreignKey: "Event_id",
                onDelete: "CASCADE"
            });
            Event.hasMany(models.Link, {
                foreignKey: "Event_id",
                onDelete: "CASCADE"
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
                type: DataTypes.TINYINT,
                validate: {
                    isInt: true,
                    min: 1,
                    max: 12
                },
            },
            day: {
                type: DataTypes.TINYINT,
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