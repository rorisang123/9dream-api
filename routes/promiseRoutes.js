const express = require('express');
const promiseController = require('../controllers/promiseController');

const router = express.Router();

router.get('/', promiseController.getPromises)
router.post('/', promiseController.createPromise)
router.get('/campaign/:id', promiseController.getPromiseByCampaignId)
router.get('/:id', promiseController.getPromiseById)
router.put('/:id', promiseController.updatePromise)
router.delete('/:id', promiseController.deletePromise)
router.get('/:campaign_id/budget', promiseController.getCampaignBudget);

module.exports = router;
