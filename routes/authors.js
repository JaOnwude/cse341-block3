const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getSingleAuthor);
router.post('/', validation.saveAuthor, authorsController.createAuthor);
router.put('/:id', validation.saveAuthor, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;