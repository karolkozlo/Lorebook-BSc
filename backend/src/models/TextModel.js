import { Model } from "sequelize";

const Text = (sequelize, DataTypes) => {
    class Text extends Model {
        static associate(models) {
            Text.belongsTo(models.Content, {
                foreignKey: "Content_id",
                onDelete: "CASCADE"
            });
        }
    }
    Text.init(
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
            text: {
                type: DataTypes.STRING(8000),
            },
        },
        {
            sequelize,
            modelName: 'Text',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'texts',
        }
    );
    return Text;

};

export default Text;