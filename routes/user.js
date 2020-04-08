const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/user/:id', userController.getUser);

router.post('/user/:id/nextPage', userController.nextPage);

router.post('/user/:id/prevPage', userController.prevPage);

router.get('/user/:id/pager', userController.loadUserPostsByPage);

router.post('/user/:userid/addreply/:id', userController.addDiscussionReply);

router.post('/user/:id/like', userController.like);

router.post('/user/:id/dislike', userController.dislike);

module.exports = router;