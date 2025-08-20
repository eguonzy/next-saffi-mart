import mongoose, { Mongoose } from "mongoose";
import logger from "../utils/logger";
import Product from "./models/Product";
import Merchant from "./models/Merchant";
import Admin from "./models/Admin";
import { findSessions } from "../services/adminSession.service";

const MONGODB_URI = process.env.MONGODB_URI;
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  Product;
  Merchant;
  Admin;

  if (cached.conn) {
    logger.info("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise && MONGODB_URI) {
    const opts = {
      bufferCommands: false,
    };
    logger.info("Creating new MongoDB connection");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    logger.info("connection successful");
  } catch (e) {
    cached.promise = null;
    logger.error(e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
