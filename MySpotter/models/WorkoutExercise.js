const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WorkoutExercise extends Model {}

WorkoutExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'exercise',
          key: 'id',
        },
    },
    Workout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'workout',
          key: 'id',
        },
    },
    weekDay: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3],
          isIn: [['MON', 'TUE','WED', 'THU', 'FRI', 'SAT', 'SUN']]
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workoutExercise',
  }
);

module.exports = WorkoutExercise ;
