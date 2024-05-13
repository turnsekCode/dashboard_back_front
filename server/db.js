import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abraham:nazvidanie123@crudmern.rskjgkq.mongodb.net/admindb?retryWrites=true&w=majority&appName=CrudMern"
    );
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
