import mongoose from "mongoose";

abstract class MongooseFactory {
  private static async _MakeConnection(type: string) {
    try {
      const uri = process.env[`MONGO_URI_${type.toUpperCase()}`];
      if (!uri) {
        throw new Error("Invalid type");
      }
      await mongoose.connect(uri);
      console.log("Connected to database...");
    } catch (err) {
      console.log("Error connecting to database...", err);
      throw new Error("Invalid type");
    }
  }

  public static async Connection(type: string) {
    switch (type) {
      case "dev":
        return await MongooseFactory._MakeConnection("dev");
      default:
        throw new Error("Invalid type");
    }
  }
}
export default MongooseFactory;
