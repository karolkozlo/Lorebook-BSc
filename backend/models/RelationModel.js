import { Model } from "sequelize";

const Relation = (sequelize, DataTypes) => {
    class Relation extends Model {
        static associate(models) {
            Relation.belongsTo(models.Character, {
                foreignKey: "Character1_id"
            });
            Relation.belongsTo(models.Character, {
                foreignKey: "Character2_id"
            });
        }
    }
    Relation.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            }
        },
        {
            sequelize,
            modelName: 'Relation',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'Relation_U',
                    unique: true,
                    fields: ['Character1_id', 'Character2_id']
                }
            ],
            tableName: 'relations'
        }
    );
    return Relation;

};

export default Relation;