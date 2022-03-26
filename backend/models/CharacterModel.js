import { Model } from "sequelize";

const Character = (sequelize, DataTypes) => {
    class Character extends Model {
        static associate(models) {
            Character.belongsTo(models.Universe, {
                foreignKey: "Universe_id"
            });
        }
    }
    Character.init(
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
            }
        },
        {
            sequelize,
            modelName: 'Character',
            timestamps: false,
            underscored: true,
        }
    );
    return Character;

};

export default Character;