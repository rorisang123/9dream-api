const express = require('express');
const voterController = require('../controllers/voterController');

const router = express.Router();

router.get('/', voterController.getVoters)
router.get('/:id', voterController.getVoterById)
router.post('/', voterController.createVoter)
router.put('/:id', voterController.updateVoter)
router.delete('/:id', voterController.deleteVoter)

module.exports = router;
