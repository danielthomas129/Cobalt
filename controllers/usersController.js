const express = require('express');
const db = require('../models');

const router = express.Router();

//  VIEW ROUTES

router.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.render('all-users', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

router.get('/users/:name', async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { userName: req.params.name }, include: db.Drawing });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

//  API ROUTES

router.get('/api/users', async (req, res) => {
  try {
    const users = db.User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Couldn't get users.",
    });
  }
});

router.get('/api/users/:id', async (req, res) => {
  try {
    const user = db.User.findOne({ where: { id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Couldn't get user.",
    });
  }
});

router.post('/api/users', async (req, res) => {
  const { username } = req.body;
  const newUser = {
    username,
  };

  try {
    const result = db.User.create(newUser);
    // should probably check the result.
    res.json({
      error: false,
      message: 'ok',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Couldn't create a new user.",
    });
  }
});

router.put('/api/users/:id', async (req, res) => {
  // update the user
});

router.delete('/api/users/:id', async (req, res) => {
  try {
    const result = db.User.destroy({ where: { id: req.params.id } });
    res.json({
      error: false,
      message: 'ok',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Couldn't delete user.",
    });
  }
});
