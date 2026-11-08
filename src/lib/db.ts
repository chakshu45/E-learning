import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  mongod?: any;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (cached.promise) {
    return await cached.promise;
  }

  const opts = {
    bufferCommands: false,
  };

  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/learnwithsky";

  cached.promise = (async () => {
    try {
      const conn = await mongoose.connect(uri, {
        ...opts,
        serverSelectionTimeoutMS: 2000,
      });
      cached.conn = conn;
      console.log(`[MongoDB] Connected: ${conn.connection.host}`);
      return conn;
    } catch (err: any) {
      console.log(`[MongoDB] Primary connection unavailable (${err.message}). Starting in-memory server...`);
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create();
        cached.mongod = mongod;
        const memUri = mongod.getUri();
        const conn = await mongoose.connect(memUri, opts);
        cached.conn = conn;
        console.log(`[MongoDB] In-Memory server connected: ${conn.connection.host}`);
        return conn;
      } catch (memErr: any) {
        console.error("[MongoDB] Failed to connect to in-memory database:", memErr);
        throw memErr;
      }
    }
  })();

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectDB;
