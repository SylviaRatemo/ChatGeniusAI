import { connect, disconnect } from "mongoose";

const mongodbUrl: string | undefined = process.env.MONGODB_URL;

async function connectToDatabase() {
  try {
    if (mongodbUrl) {
      // 'mongodbUrl' is now guaranteed to be a string
      await connect(mongodbUrl);
    } else {
      throw new Error("MONGODB_URL is not defined");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
