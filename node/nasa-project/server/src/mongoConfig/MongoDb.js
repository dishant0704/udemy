const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

let isConnected = false;

async function connect() {
  if (isConnected) {
    return cached.conn;
  }

  if (cached.conn) {
    isConnected = true;
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "udemy",
    });
  }

  cached.conn = await cached.promise;

  // console.log("Mongo DB Connected");

  isConnected = true;

  return cached.conn;
}

async function disconnect() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

module.exports = {
  connect,
  disconnect,
};