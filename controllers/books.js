const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
  try {
    console.log("GET /books - Request received");
    
    const result = await mongodb.getDb().db().collection('books').find().toArray();
    
    console.log(`Found ${result.length} books`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in getAllBooks:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    console.log("GET /books/:id - Request received with id:", req.params.id);
    
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to find a book.');
    }
    
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('books').find({ _id: bookId }).toArray();
    
    console.log("✅ Single book result:", result[0] ? "Found" : "Not found");
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0] || null);
  } catch (err) {
    console.error("Error in getSingleBook:", err);
    res.status(400).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      isbn: req.body.isbn,
      authorId: req.body.authorId,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
      pages: req.body.pages,
      publisher: req.body.publisher,
      description: req.body.description
    };

    const response = await mongodb.getDb().db().collection('books').insertOne(book);
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to update a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      isbn: req.body.isbn,
      authorId: req.body.authorId,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
      pages: req.body.pages,
      publisher: req.body.publisher,
      description: req.body.description
    };

    const response = await mongodb.getDb().db().collection('books')
      .replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to delete a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('books')
      .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while deleting the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};