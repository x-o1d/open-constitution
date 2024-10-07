import { Db, MongoClient } from "mongodb";

const URL = "mongodb://localhost:27017";

let client: MongoClient | undefined = undefined;
let db: Db | undefined;

export const getDb = async () => {
  if (client === undefined) {
    client = new MongoClient(URL);
    try {
      await client.connect();
      db = client.db("open-constitution");
    } catch (error) {
      console.log("DB :", error);
      return undefined;
    }
    console.log("Successfully connected to server");
  }
  return db;
};
