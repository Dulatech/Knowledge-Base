const express = require('express');
// const artistController = require('../controllers/ArtistController');
const loginController = require('../controllers/LoginController');
const registerController = require('../controllers/RegisterController');
const router = express.Router();


router.post('/login', loginController.transport);
router.post('/register', registerController.transport);
router.post('/userReg', registerController.createUser);


module.exports = router;
