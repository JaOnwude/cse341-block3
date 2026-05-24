
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');          
// const mongodb = require('./db/connect');

// const port = process.env.PORT || 8080;
// const app = express();

// // Enable CORS 
// app.use(cors({
//   origin: '*',                   
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// app.use(bodyParser.json());

// app.use('/', require('./routes'));

// // Global error handler
// process.on('uncaughtException', (err, origin) => {
//   console.error(`Caught exception: ${err}\nException origin: ${origin}`);
// });

// mongodb.initDb((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port, () => {
//       console.log(`Connected to DB and listening on ${port}`);
//     });
//   }
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();


app.use(cors({
  origin: '*',                   
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());

app.use('/', require('./routes'));

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: "Personal Library API is running successfully!",
    docs: "/api-docs"
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});