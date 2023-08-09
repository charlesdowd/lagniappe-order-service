import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Gets rid of warning of some mongoose deprecation.
    mongoose.set('strictQuery', false);

    if (!process.env.DATABASE_URI) throw new Error('Database uri is empty');

    mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
