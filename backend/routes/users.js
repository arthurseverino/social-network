require('dotenv').config();
const express = require('express');
const passport = require('passport');
const postRoutes = require('./posts');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  loginUser,
  followUser,
} = require('../controllers/userController');

// GET all users, a list of all users
// shows all users and buttons for sending follow requests to users the user is not already following or have a pending request.
router.get('/', passport.authenticate('jwt', { session: false }), getUsers);

// GET a single users data
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);

// UPDATE a user, you can update a user from its profile page
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateUser
);

// CREATE a new user, you can create a new user from the signup page
router.post('/signup', createUser);

// LOGIN a user, handle login form submission
router.post(
  '/login',
  passport.authenticate('local', { failWithError: true, session: false }),
  loginUser
);

router.post(
  '/:id/follow',
  passport.authenticate('jwt', { session: false }),
  followUser
);

// this is router.use so it will go to router.get(/) in posts.js
// GET posts on timeline, shows all posts from users the user is following
router.use(
  '/:id/posts',
  passport.authenticate('jwt', { session: false }),
  postRoutes
);

module.exports = router;
