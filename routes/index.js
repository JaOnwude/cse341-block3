// const express = require('express');
// const router = express.Router();

// router.use('/books', require('./books'));
// router.use('/authors', require('./authors'));
// router.use('/', require('./swagger'));

// module.exports = router;

const express = require('express');
const router = express.Router();

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.json({
    message: "Personal Library API is running!",
    documentation: "/api-docs",
    endpoints: {
      books: "/books",
      authors: "/authors"
    }
  });
});

module.exports = router;