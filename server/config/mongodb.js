import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error(
        "MONGODB_URL environment variable is not defined. Please create a .env file with MONGODB_URL."
      );
    }
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error: ", err);
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
