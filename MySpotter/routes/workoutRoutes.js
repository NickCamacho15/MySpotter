const router = require('express').Router();
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

const exerciseRoutes = require('./exerciseRoutes');
router.use('/:workoutId/exercises', exerciseRoutes);

module.exports = router;
