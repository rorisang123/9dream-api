const express = require('express');
const expertController = require('../controllers/expertController');

const router = express.Router();

router.get('/', expertController.getExperts)
router.post('/', expertController.createExpert)
router.get('/:id', expertController.getExpertById)
router.put('/:id', expertController.updateExpert)
router.delete('/:id', expertController.deleteExpert)

module.exports = router;
