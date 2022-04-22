import { Model } from "sequelize";

const TagContent = (sequelize, DataTypes) => {
    class TagContent extends Model {
        static associate(models) {
        }
    }
    TagContent.init(
        { },
        {
            sequelize,
            modelName: 'TagContent',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'tag_content',
        }
    );
    return TagContent;

};

export default TagContent;