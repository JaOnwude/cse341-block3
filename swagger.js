// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//   info: {
//     title: 'Personal Library API',
//     description: 'CSE341 - My Personal Library Management API'
//   },
//   host: 'cse341-block3-weeks03-04.onrender.com',
//   schemes: ['https']
// };

// const outputFile = './swagger.json';
// const endpointsFiles = ['./routes/index.js'];

// swaggerAutogen(outputFile, endpointsFiles, doc);

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Personal Library API',
    description: 'CSE341 - My Personal Library API with Google OAuth',
    version: '2.0.0'
  },
  host: 'cse341-block3-weeks03-04.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    googleOAuth: {
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
      scopes: {
        'profile': 'Access your basic profile',
        'email': 'Access your email'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);