import { Model } from "sequelize";

const ImageGroup = (sequelize, DataTypes) => {
    class ImageGroup extends Model {
        static associate(models) {
            ImageGroup.belongsTo(models.Content, {
                foreignKey: "Content_id",
                onDelete: "CASCADE"
            });
        }
    }
    ImageGroup.init(
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
            modelName: 'ImageGroup',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'Image_groups',
        }
    );
    return ImageGroup;

};

export default ImageGroup;