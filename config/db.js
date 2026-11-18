import mongoose from "mongoose";

const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/margareth_beautrice_laurentia_menu_makanan";
  await mongoose.connect(uri);
  console.log(`MongoDB terhubung: ${mongoose.connection.name}`);
};

export default connectDB;

