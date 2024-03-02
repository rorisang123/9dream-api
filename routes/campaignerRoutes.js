const express = require('express');
const campaignerController = require('../controllers/campaignerController');

const router = express.Router();

router.get('/', campaignerController.getCampaigners)
router.get('/:id', campaignerController.getCampaignerById)
router.post('/', campaignerController.createCampaigner)
router.put('/:id', campaignerController.updateCampaigner)
router.delete('/:id', campaignerController.deleteCampaigner)

module.exports = router;
