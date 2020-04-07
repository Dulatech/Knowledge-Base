const express = require('express');
const profileController = require('../controllers/ProfileController');

const router = express.Router();

router.get('/profile/editor', profileController.profileEditor);

router.post('/profile/edit', profileController.editProfile);

router.get('/profile/userProfile', profileController.getProfile);

router.get('/profile/posts', profileController.getAllCurrentUserPosts);

router.post('/profile/posts/nextPage', profileController.nextPage);

router.post('/profile/posts/prevPage', profileController.prevPage);

router.get('/profile/posts/pager', profileController.loadCurrentUserPostsByPage);

router.post('/profile/posts/addreply/:id', profileController.addDiscussionReply);

module.exports = router;