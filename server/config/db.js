import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("strictQuery", false);
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error while connecting to MongoDB");
    console.error(error);
  }
};

export default db;
