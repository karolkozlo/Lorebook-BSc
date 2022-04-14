import { Model } from "sequelize";

const List = (sequelize, DataTypes) => {
    class List extends Model {
        static associate(models) {
            List.belongsTo(models.Content, {
                foreignKey: "Content_id",
                onDelete: "CASCADE"
            });
        }
    }
    List.init(
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
            modelName: 'List',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'lists',
        }
    );
    return List;

};

export default List;