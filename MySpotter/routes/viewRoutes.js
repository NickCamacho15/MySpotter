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

module.exports = router;
