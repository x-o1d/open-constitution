import { getCollection, getDb, getDocument } from "$lib/service/mongo.js";
import { error } from "@sveltejs/kit";
import { ObjectId, UUID } from "mongodb";


const getDotNotation = (indexArray: number[]): {field: string, position: number} => {
  const position = indexArray.pop() || -1;
  const field = indexArray.reduce((a,c) => a ? `${a}.lines.${c}` : `lines.${c}`,'') + '.lines'
  return {
    field,
    position
  }
}

export async function GET({ url }) {
  try {
    let document = await getDocument();
    return new Response(JSON.stringify({ lines: document.lines}));
  } catch(e) {
    console.log(e);
    error(500, 'internal server error');
  }
}


export interface PostRequestData {
  index: number[];
  line: string;
}

export async function POST({request}) {

  const collection = await getCollection();

  const data: PostRequestData = await request.json();

  const {field, position} = getDotNotation(data.index);
  
  const updateResult = await collection.updateOne({}, {
    $push: {
      [field]: {
        $each: [{
          id: (new UUID()).toString(),
          content: data.line,
          lines: []
        }],
        $position: position
      }
    }
  })

  return new Response(JSON.stringify({
      status: updateResult,
      success: true
  }));
}

export interface DeleteRequestData {
  id: string;
}

export async function DELETE({ request }) {
  const collection = await getCollection();

  const data: DeleteRequestData = await request.json();

  
  const updateResult = await collection.updateOne({}, {
    $pull: {
      lines: {
        'id': data.id
      }
    }
  })

  return new Response(JSON.stringify({
      status: updateResult,
      success: true
  }));
}