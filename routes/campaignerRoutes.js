const express = require('express');
const campaignerController = require('../controllers/campaignerController');

const router = express.Router();

router.get('/', campaignerController.getCampaigners)
router.post('/', campaignerController.createCampaigner)
router.get('/:id', campaignerController.getCampaignerById)
router.put('/:id', campaignerController.updateCampaigner)
router.delete('/:id', campaignerController.deleteCampaigner)

module.exports = router;
