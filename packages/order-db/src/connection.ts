import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URL) {
    throw Error("MONGO_URL doesnt exist or not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("connected to mongo db");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
