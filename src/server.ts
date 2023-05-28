import mongoose from "mongoose";
import app from "./App";
import config from "./config";

async function Connect() {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log("Database connection established");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
Connect();
