const express = require('express');
const msgController = require('../controllers/MessageController');

const router = express.Router();


// router.post('/login', loginController.transport);

// router.post('/logout', artistController.transport);

router.get('/messages', msgController.getAllMessages);

// router.post('/artists/add', artistController.postAddArtists)

router.post('/messages/view', msgController.gelSelectedMessage);

// router.get('/artists/search/', artistController.getArtists)

module.exports = router;