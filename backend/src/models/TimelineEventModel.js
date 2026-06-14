import { Model } from "sequelize";

const TimelineEvent = (sequelize, DataTypes) => {
    class TimelineEvent extends Model {
        static associate(models) {
        }
    }
    TimelineEvent.init(
        { },
        {
            sequelize,
            modelName: 'TimelineEvent',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'timeline_event',
        }
    );
    return TimelineEvent;

};

export default TimelineEvent;