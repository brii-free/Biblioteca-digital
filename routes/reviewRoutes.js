const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createReview, getReviewsByBook, updateReview, deleteReview } = require('../controllers/reviewController');

router.post('/', protect, createReview);
router.get('/:bookId', getReviewsByBook);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
