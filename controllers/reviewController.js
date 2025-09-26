const Review = require('../models/Review');
const Book = require('../models/Book');

// Crear reseña
const createReview = async (req, res) => {
  const { bookId, comment, rating } = req.body;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const review = new Review({
    user: req.user._id,
    book: bookId,
    comment,
    rating
  });

  await review.save();

  // Agregar referencia a libro
  book.reviews.push(review._id);
  await book.save();

  res.status(201).json(review);
};

// Obtener reseñas de un libro
const getReviewsByBook = async (req, res) => {
  const { bookId } = req.params;
  const reviews = await Review.find({ book: bookId }).populate('user', 'username');
  res.json(reviews);
};

// Actualizar reseña
const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  review.comment = req.body.comment || review.comment;
  review.rating = req.body.rating || review.rating;

  await review.save();
  res.json(review);
};

// Eliminar reseña
const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await review.remove();
  res.json({ message: 'Review removed' });
};

module.exports = { createReview, getReviewsByBook, updateReview, deleteReview };
