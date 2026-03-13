require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const morgan = require('morgan');
// Middlewares
app.use(morgan('tiny'));
app.use(express.json());

//Routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Starting the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};
start();
