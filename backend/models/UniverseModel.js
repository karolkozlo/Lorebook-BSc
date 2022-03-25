import { Model } from "sequelize";

const Universe = (sequelize, DataTypes) => {
    class Universe extends Model {
        static associate(models) {
            Universe.belongsTo(models.User, {
                foreignKey: "User_id"
            });
        }
    }
    Universe.init(
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
            }
        },
        {
            sequelize,
            modelName: 'Universe',
            timestamps: false,
            underscored: true,
        }
    );
    return Universe;

};

export default Universe;