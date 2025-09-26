const Book = require('../models/Book');

// Crear libro
const createBook = async (req, res) => {
  const { title, author } = req.body;
  const pdf = req.file.path;

  const book = new Book({ title, author, pdf, user: req.user._id });
  await book.save();
  res.status(201).json(book);
};

// Obtener todos los libros
const getBooks = async (req, res) => {
  const books = await Book.find().populate('user', 'username');
  res.json(books);
};

// Actualizar libro
const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (req.file) book.pdf = req.file.path;

  await book.save();
  res.json(book);
};

// Eliminar libro
const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  await book.remove();
  res.json({ message: 'Book removed' });
};

module.exports = { createBook, getBooks, updateBook, deleteBook };
