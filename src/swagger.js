// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes.ts'];

swaggerAutogen(outputFile, endpointsFiles);
