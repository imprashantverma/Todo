const express = require('express');
const router = express.Router();

const signup = require('../Controller/signup');
const login = require('../Controller/login');
const { deleteList, createList, updateList } = require('../Controller/list');
const{ getUserPosts,getfavpost} = require('../Controller/allpost');
const {addToFav,removeToFav} = require('../Controller/favourites');

// Route to get user posts
router.get('/posts/:id', getUserPosts);

router.get('/favpost/:id',getfavpost);

// Route to signup a new user
router.post('/signup', signup);

// Route to login a user
router.post('/login', login);

// Route to add a new list item
router.post('/createlist/:id', createList);

// Route to add item to favourites
router.post('/addfav/:user/:liked', addToFav); 

// Route to Delete item from Favourites
router.delete('/removefav/:user/:liked',removeToFav);

// Route to update a list item
router.put('/updatetask/:user/:id', updateList);

// Route to delete a list item
router.delete('/deletelist/:user/:postId', deleteList);

module.exports = router;
