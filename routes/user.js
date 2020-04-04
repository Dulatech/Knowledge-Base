const express = require('express');
const profileController = require('../controllers/ProfileController');

const router = express.Router();

router.get('/user/profile/editor', profileController.profileEditor);

router.post('/user/profile/edit', profileController.editProfile);

// router.post('/login', loginController.transport);

// router.post('/logout', artistController.transport);

// router.get('/artists', artistController.getAllArtists);

// router.post('/artists/add', artistController.postAddArtists)

// router.get('/artists/delete/:id', artistController.postDeleteArtists)

// router.get('/artists/search/', artistController.getArtists)

module.exports = router;