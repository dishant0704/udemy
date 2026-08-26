const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://ketandutt_db_user:b4CGMFQtvOILldlB@cluster0.6ktl8zl.mongodb.net";

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

  console.log("Mongo DB Connected");

  isConnected = true;

  return cached.conn;
}

module.exports = connect;