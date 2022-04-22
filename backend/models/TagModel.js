import { Model } from "sequelize";

const Tag = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            Tag.belongsTo(models.Universe, {
                foreignKey: "Universe_id"
            });
            Tag.belongsToMany(models.Content, {
                through: models.TagContent,
                foreignKey: 'Tag_id',
                onDelete: 'CASCADE',
            });
        }
    }
    Tag.init(
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
        },
        {
            sequelize,
            modelName: 'Tag',
            timestamps: false,
            underscored: true,
        }
    );
    return Tag;

};

export default Tag;