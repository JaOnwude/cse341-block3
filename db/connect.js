const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const dns = require('dns');  

dns.setServers(['8.8.8.8', '1.1.1.1']);

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;
  console.log("MONGODB_URI loaded:", uri ? "YES (hidden)" : "UNDEFINED!");

  if (!uri) {
    console.error("ERROR: MONGODB_URI is missing");
    return callback(new Error("MONGODB_URI is missing"));
  }

  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      console.log("Successfully connected to MongoDB");
      callback(null, _db);
    })
    .catch((err) => {
      console.error("MongoDB Connection Error:", err.message);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };