import { Model } from "sequelize";

const LinkGroup = (sequelize, DataTypes) => {
    class LinkGroup extends Model {
        static associate(models) {
            LinkGroup.belongsTo(models.Content, {
                foreignKey: "Content_id",
                onDelete: "CASCADE"
            });
        }
    }
    LinkGroup.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'LinkGroup',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'Link_groups',
        }
    );
    return LinkGroup;

};

export default LinkGroup;