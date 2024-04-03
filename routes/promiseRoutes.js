const express = require('express');
const promiseController = require('../controllers/promiseController');

const router = express.Router();

router.get('/', promiseController.getPromises)
router.get('/:campaign_id/budget', promiseController.getCampaignBudget);
router.get('/:id', promiseController.getPromiseById)
router.post('/', promiseController.createPromise)
router.put('/:id', promiseController.updatePromise)
router.delete('/:id', promiseController.deletePromise)

module.exports = router;
