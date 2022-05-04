import { Model } from "sequelize";

const Link = (sequelize, DataTypes) => {
    class Link extends Model {
        static associate(models) {
            Link.belongsTo(models.LinkGroup, {
                foreignKey: "Link_group_id",
                onDelete: "CASCADE"
            });
            Link.belongsTo(models.Chapter, {
                foreignKey: "Chapter_id",
                onDelete: "CASCADE"
            });
            Link.belongsTo(models.Entry, {
                foreignKey: "Entry_id",
                onDelete: "CASCADE"
            });
            Link.belongsTo(models.Character, {
                foreignKey: "Character_id",
                onDelete: "CASCADE"
            });
            Link.belongsTo(models.Location, {
                foreignKey: "Location_id",
                onDelete: "CASCADE"
            });
            Link.belongsTo(models.Event, {
                foreignKey: "Event_id",
                onDelete: "CASCADE"
            });
        }
    }
    Link.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Link',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'Links',
        }
    );
    return Link;

};

export default Link;