import { getDb } from "$lib/service/mongo.js";
import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export async function GET({ url }) {

  const db = await getDb();
  if (!db) {
    error(500, "internal server error");
  }

  const collection = db.collection("lines");

  const lines = await collection.find({}).toArray();

  lines.forEach((e, i) => e.index = i+1);

  if (lines.length) {
    return new Response(JSON.stringify({ lines: lines}));
  } else {
    return new Response(JSON.stringify({ lines: []}));
  }
  
}

export async function POST({request}) {

  const data = await request.json();

  const line = data.line;

  const db = await getDb();
  if (!db) {
    error(500, "internal server error");
  }
  
  const collection = db.collection("lines");

  const insertResult = collection.insertOne( {
    content: line
  })

  return new Response(JSON.stringify({
      status: insertResult,
      success: true
  }));
}

export interface RequestData {
  _id: string;
}

export async function DELETE({ request }) {
  const data: RequestData = await request.json();

  const db = await getDb();
  if (!db) {
    error(500, "internal server error");
  }

  const collection = db.collection("lines");

  console.log(data._id);

  const deleteResult =await collection.deleteOne({
    _id: new ObjectId(data._id)
  })

  console.log(deleteResult);

  return new Response(JSON.stringify({
    success: true
  }));
}