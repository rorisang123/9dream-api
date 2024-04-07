const express = require('express');
const voterController = require('../controllers/voterController');

const router = express.Router();

router.get('/', voterController.getVoters)
router.post('/', voterController.createVoter)
router.get('/:id', voterController.getVoterById)
router.put('/:id', voterController.updateVoter)
router.delete('/:id', voterController.deleteVoter)

module.exports = router;
