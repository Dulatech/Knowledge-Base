const express = require('express');
const profileController = require('../controllers/ProfileController');

const router = express.Router();

router.get('/user/profile/editor', profileController.profileEditor);

router.post('/user/profile/edit', profileController.editProfile);

router.get('/user/profile/posts', profileController.getAllCurrentUserPosts);

router.post('/user/profile/posts/nextPage', profileController.nextPage);

router.post('/user/profile/posts/prevPage', profileController.prevPage);

router.get('/user/profile/posts/pager', profileController.loadCurrentUserPostsByPage);

router.post('/user/profile/posts/addreply/:id', profileController.addDiscussionReply);

module.exports = router;