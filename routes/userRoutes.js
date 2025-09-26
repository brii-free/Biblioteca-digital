const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  registerUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/UserController');

router.post('/register', registerUser);
router.post('/login', authUser);

router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
