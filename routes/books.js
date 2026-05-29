// const express = require('express');
// const router = express.Router();
// const booksController = require('../controllers/books');
// const validation = require('../middleware/validate');

// router.get('/', booksController.getAllBooks);
// router.get('/:id', booksController.getSingleBook);
// router.post('/', validation.saveBook, booksController.createBook);
// router.put('/:id', validation.saveBook, booksController.updateBook);
// router.delete('/:id', booksController.deleteBook);

// module.exports = router;

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);

// Protected routes
router.post('/', isAuthenticated, validation.saveBook, booksController.createBook);
router.put('/:id', isAuthenticated, validation.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;