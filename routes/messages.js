const express = require('express');
const msgController = require('../controllers/MessageController');

const router = express.Router();


// router.post('/login', loginController.transport);

router.get('/profile/message', msgController.createMessage);

router.post('/profile/message/send', msgController.sendNewMessage)

router.get('/messages', msgController.getAllMessages);

router.post('/messages/addReply', msgController.addReply)

router.post('/messages/view', msgController.gelSelectedMessage);

module.exports = router;