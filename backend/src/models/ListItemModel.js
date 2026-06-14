import { Model } from "sequelize";

const ListItem = (sequelize, DataTypes) => {
    class ListItem extends Model {
        static associate(models) {
            ListItem.belongsTo(models.List, {
                foreignKey: "List_id",
                onDelete: "CASCADE"
            });
        }
    }
    ListItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            text: {
                type: DataTypes.STRING(1000),
            },
            ordinal_number: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'ListItem',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'list_items',
        }
    );
    return ListItem;

};

export default ListItem;