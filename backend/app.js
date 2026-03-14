require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes/authRoutes');
const userRoutes = require('./routes//userRoutes');

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

//Adding routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tests', testRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);
app.use('/api/v1/market', marketRoutes);
app.use('/api/v1/admin', adminRoutes);

//Error handling middlewares
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
