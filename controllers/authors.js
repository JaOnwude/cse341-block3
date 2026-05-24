const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
  try {
    console.log("GET /authors - Request received");
    const result = await mongodb.getDb().db().collection('authors').find().toArray();
    console.log(`Found ${result.length} authors`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in getAllAuthors:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingleAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid author id to find an author.');
    }
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('authors').find({ _id: authorId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0] || null);
  } catch (err) {
    console.error("Error in getSingleAuthor:", err);
    res.status(400).json({ message: err.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality,
      biography: req.body.biography
    };
    const response = await mongodb.getDb().db().collection('authors').insertOne(author);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid author id to update an author.');
    }
    const authorId = new ObjectId(req.params.id);
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality,
      biography: req.body.biography
    };

    const response = await mongodb.getDb().db().collection('authors')
      .replaceOne({ _id: authorId }, author);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid author id to delete an author.');
    }
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('authors')
      .deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while deleting the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};