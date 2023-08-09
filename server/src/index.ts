import mongoose from 'mongoose';
import app from './app';
import connectDB from './config/dbConnection';

const PORT = process.env.PORT || 4000;

connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
});

mongoose.connection.on('error', (error) => {
  console.log(error);
});
