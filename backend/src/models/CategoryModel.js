import { Model } from "sequelize";

const Category = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsTo(models.Universe, {
                foreignKey: "Universe_id"
            });
            Category.hasMany(models.Entry, {
                foreignKey: "Category_id",
                onDelete: "CASCADE"
            });
        }
    }
    Category.init(
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
            modelName: 'Category',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'categories',
            indexes: [
                {
                    name: 'Category_U',
                    unique: true,
                    fields: ['name', 'Universe_id']
                }
            ]
        }
    );
    return Category;

};

export default Category;