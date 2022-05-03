import { Model } from "sequelize";

const User = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Universe, {
                foreignKey: "User_id",
                onDelete: "CASCADE"
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    is: {
                      args: /^.+@.+$/,
                      msg: "Invalid e-mail",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: false,
            underscored: true,
        }
    );
    return User;

};

export default User;