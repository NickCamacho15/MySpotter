const { Exercise } = require('../models');
const { Workout } = require('../models');


module.exports = {
    getAllExercises: async (req, res) => {
        try {
          const exercises = await Exercise.findAll({ where: { workout_id: req.params.workout_id } });
          const workout = await Workout.findAll({ where: { id: req.params.workout_id } });
          res.render('workout', {exercises, workout});
        } catch (err) {
          res.status(500).json(err);
        }
      },

  getExerciseById: async (req, res) => {
    try {
      const exercise = await Exercise.findByPk(req.params.id);
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      res.json(exercise);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createExercise: async (req, res) => {
    try {
      const workout = await Workout.findByPk(req.params.workout_id);
      if (workout.user_id !== req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      const newExercise = await Exercise.create({ ...req.body, workout_id: req.params.workout_id });
      res.status(201).json(newExercise);
    } catch (err) {
      res.status(500).json(err);
    }
  },  

  updateExercise: async (req, res) => {
    console.log(req.body.exerciseId);
    try {
      
      const result = await Exercise.update(req.body, { where: { id: req.body.exerciseId } });
      if (result[0] === 0) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      res.json({ message: 'Exercise updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteExercise: async (req, res) => {
    try {
      const result = await Exercise.destroy({ where: { id: req.params.id } });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
