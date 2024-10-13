import { Db, MongoClient, ObjectId, type WithId , type Document, Collection } from "mongodb";

const URL = "mongodb://localhost:27017";

let client: MongoClient | undefined = undefined;
let db: Db | undefined;

interface _Line {
  id: string;
  content: string;
  lines: _Line[];
}
export interface _Document {
  id: ObjectId;
  lines: _Line[];
}

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

export const getCollection = async (): Promise<Collection<_Document>> => {
  const db = await getDb();
  if (!db) {
    console.log('database not found');
    throw `database-not-found`
  }

  return db.collection("documents")
}

export const getDocument = async (): Promise<WithId<Document>> => {

  const db = await getDb();
  if (!db) {
    console.log('database not found');
    throw `database-not-found`
  }

  const collection = db.collection("documents")

  let document = await collection.findOne();

  if(!document) {
    document = {
      _id: new ObjectId(),
      lines: []
    }
    collection.insertOne(document);
  } 

  return document;
};

