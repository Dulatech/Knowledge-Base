const express = require('express');
const discussionController = require('../controllers/DiscussionController');
const router = express.Router();


router.get('/discussion', discussionController.loadHome);

router.post('/discussion/add', discussionController.addDiscussion);

router.post('/discussion/nextPage', discussionController.nextPage);

router.post('/discussion/prevPage', discussionController.prevPage);

router.get('/discussion/pager', discussionController.loadHomeByPage);
// router.post('/logout', artistController.transport);

// router.get('/artists', artistController.getAllArtists);

// router.post('/artists/add', artistController.postAddArtists)

// router.get('/artists/delete/:id', artistController.postDeleteArtists)

// router.get('/artists/search/', artistController.getArtists)

module.exports = router;