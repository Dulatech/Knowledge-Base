const express = require('express');
const msgController = require('../controllers/MessageController');

const router = express.Router();



router.post('/profile/message/send', msgController.sendNewMessage)

router.get('/message/:id', msgController.getMessages);

router.post('/messages/addReply', msgController.addReply)

router.post('/messages/view', msgController.gelSelectedMessage);

module.exports = router;