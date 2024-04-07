const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/', reviewController.getReviews)
router.post('/', reviewController.createReview)
router.get('/:id', reviewController.getReviewById)
router.put('/:id', reviewController.updateReview)
router.delete('/:id', reviewController.deleteReview)

module.exports = router;
