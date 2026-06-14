import { Model } from "sequelize";

const Template = (sequelize, DataTypes) => {
    class Template extends Model {
        static associate(models) {
            Template.belongsTo(models.Universe, {
                foreignKey: "Universe_id",
                onDelete: "CASCADE"
            });
        }
    }
    Template.init(
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
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            template: {
                type: DataTypes.JSON,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'Template',
            timestamps: false,
            underscored: true,
        }
    );
    return Template;

};

export default Template;