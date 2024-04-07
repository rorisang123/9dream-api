const express = require('express');
const voteController = require('../controllers/voteController');

const router = express.Router();

router.get('/', voteController.getVotes)
router.post('/', voteController.createVote)
router.get('/count', voteController.getNumberOfvotes)
router.get('/:id', voteController.getVoteById)
router.put('/:id', voteController.updateVote)
router.delete('/:id', voteController.deleteVote)

module.exports = router;
