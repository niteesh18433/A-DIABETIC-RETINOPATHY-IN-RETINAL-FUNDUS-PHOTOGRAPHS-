import mongoose from 'mongoose';

const baseUrl = process.env.MONGODB || '0.0.0.0:27017';

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(`mongodb://${baseUrl}/logIngester`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected using mongoose');
    const db = mongoose.connection;
    await createIndexes(db);
  } catch (err) {
    console.error(err);
  }
};

const createIndexes = async db => {
  try {
    await db.collection('logs').createIndex({ level: 1 });
    await db.collection('logs').createIndex({ message: 1 });
    await db.collection('logs').createIndex({ timestamp: 1 });

    console.log('Indexes created');
  } catch (error) {
    console.error(error);
  }
};