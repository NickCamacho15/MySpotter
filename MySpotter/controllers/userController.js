const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const result = await User.update(req.body, { where: { id: req.params.id } });
      if (result[0] === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await User.destroy({ where: { id: req.params.id } });
      if (result === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
      req.session.save(() => {
        req.session.loggedIn = true;
        console.log(
          'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
          req.session.cookie
        );
        req.session.userId = user.id;
        req.session.user = user; 
        res
          .status(200)
          .json({ message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: 'Logged out successfully' });
    });
  },
  createUser: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword 
        });
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = newUser.id;
        req.session.user = newUser;
        res.status(200).json({ user: newUser, message: 'You are now logged in!' });
      });

    } catch (err) {
      res.status(500).json(err);
    }
  },
};
