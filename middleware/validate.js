const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const rules = {
    title: 'required|string|min:1',
    isbn: 'required|string',
    authorId: 'required|string',
    publishedYear: 'required|integer|min:1000',
    genre: 'required|string',
    pages: 'required|integer|min:1',
    publisher: 'required|string',
    description: 'string|max:500'
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err
      });
    } else {
      next();
    }
  });
};

const saveAuthor = (req, res, next) => {
  const rules = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthYear: 'required|integer',
    nationality: 'required|string',
    biography: 'string|max:300'
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err
      });
    } else {
      next();
    }
  });
};

module.exports = { saveBook, saveAuthor };