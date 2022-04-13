import { Model } from "sequelize";

const Content = (sequelize, DataTypes) => {
    class Content extends Model {
        static associate(models) {
            Content.belongsTo(models.Entry, {
                foreignKey: "Entry_id",
                onDelete: "CASCADE"
            });
            Content.belongsTo(models.Character, {
                foreignKey: "Character_id",
                onDelete: "CASCADE"
            });
            Content.belongsTo(models.Location, {
                foreignKey: "Location_id",
                onDelete: "CASCADE"
            });
            Content.belongsTo(models.Event, {
                foreignKey: "Event_id",
                onDelete: "CASCADE"
            });
        }
    }
    Content.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        },
        {
            sequelize,
            modelName: 'Content',
            timestamps: false,
            underscored: true,
        }
    );
    return Content;

};

export default Content;