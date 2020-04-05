const express = require('express');
const discussionController = require('../controllers/DiscussionController');
const router = express.Router();


router.get('/discussion', discussionController.loadHome);

router.post('/discussion/add', discussionController.addDiscussion);

router.post('/discussion/nextPage', discussionController.nextPage);

router.post('/discussion/prevPage', discussionController.prevPage);

router.get('/discussion/pager', discussionController.loadHomeByPage);

router.post('/discussion/addreply/:id', discussionController.addDiscussionReply);

router.post('/discussion/searchtopic', discussionController.searchByTopic);

router.get('/discussion/search', discussionController.search);

module.exports = router;