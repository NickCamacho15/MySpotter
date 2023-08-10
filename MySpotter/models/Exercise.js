const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['hobbie', 'gym workout']],
      }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caloriesPerMinute: {
    type: DataTypes.FLOAT,
    allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [100],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise',
  }
);

module.exports = Exercise;
