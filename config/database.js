import mongoose from 'mongoose';

let connected = false;

/** Connecting to Mongo DB Atlas */

const connectDB = async () => {
  // Ensures that only the fields that specified in the schema will be saved in the database
  mongoose.set('strictQuery', true);

  // If the database is already connected, don't connect again

  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
