const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        const username = req.session.user.username;
        res.render('index', { username }); 
    } else {
        res.render('home');
    }
});

router.get('/index', (req, res) => {
      res.render('index');
  });

router.get('/login', (req, res) => {
  res.render('login'); 
});

router.get('/signup', (req, res) => {
  res.render('signup'); 
});
const { Workout } = require('../models');

router.get('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).render('not-found', { message: 'Workout not found' });
    }
    res.render('workout', { workout });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});


module.exports = router;
