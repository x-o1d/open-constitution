import { error } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";
import { getDb } from "$lib/service/mongo";

export async function load(event: PageServerLoadEvent) {

  const db = await getDb();
  if (!db) {
    error(500, "internal server error");
  }

  const collection = db.collection("lines");

  const lines = await collection.find({}).toArray();

  lines.forEach((e, i) => e.index = i+1);

  if (lines.length) {
    return JSON.parse(JSON.stringify({ lines: lines}));
  } else {
    return JSON.parse(JSON.stringify({ lines: []}));
  }
}
