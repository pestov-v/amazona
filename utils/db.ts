import mongoose, { LeanDocument } from 'mongoose';
import { IProduct } from 'types';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;
const newConn = { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = newConn;
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
async function disconnect() {
  if (cached.conn && process.env.NODE_ENV === 'production') {
    mongoose.disconnect();
    cached.conn = newConn;
  }
}

const db = {
  connect,
  disconnect,
};

export default db;

export const convertDocToObj = (doc: LeanDocument<IProduct>): IProduct => {
  return {
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt.toString(),
    updatedAt: doc.updatedAt.toString(),
  };
};
