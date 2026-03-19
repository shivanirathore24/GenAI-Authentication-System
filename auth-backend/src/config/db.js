import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
