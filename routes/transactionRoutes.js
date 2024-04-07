const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/', transactionController.getTransactions)
router.post('/', transactionController.createTransaction)
router.get('/:id', transactionController.getTransactionById)
router.put('/:id', transactionController.updateTransaction)
router.delete('/:id', transactionController.deleteTransaction)

module.exports = router;
