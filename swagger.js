const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Personal Library API',
    description: 'CSE341 - My Personal Library Management API'
  },
  host: 'cse341-block3-weeks03-04.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);