import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  let mongooseCache: MongooseCache;
}

const globalAny = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

if (!globalAny.mongooseCache) {
  globalAny.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export async function connectDB(): Promise<Connection> {
  const cached = globalAny.mongooseCache!;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;

  return cached.conn;
}
