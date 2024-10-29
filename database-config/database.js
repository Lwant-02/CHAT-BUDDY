import mongoose from "mongoose";

export async function connectMongooes() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connect to database success.");
  } catch (error) {
    console.log(error);
  }
}
