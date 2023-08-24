const router = require('express').Router({ mergeParams: true });
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exerciseController');

router.get('/', getAllExercises);
router.delete('/:id', deleteExercise);
router.post('/', createExercise);
router.put('/', updateExercise);


module.exports = router;
