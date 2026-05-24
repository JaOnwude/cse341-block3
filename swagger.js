const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Personal Library API',
    description: 'CSE341 - My Personal Library Management API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);