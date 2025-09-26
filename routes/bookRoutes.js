const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const protect = require('../middleware/authMiddleware');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');

router.route('/')
  .get(getBooks)
  .post(protect, upload.single('pdf'), createBook);

router.route('/:id')
  .put(protect, upload.single('pdf'), updateBook)
  .delete(protect, deleteBook);

module.exports = router;
