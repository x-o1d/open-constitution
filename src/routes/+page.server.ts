import { error } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";
import { getDocument } from "$lib/service/mongo";

export async function load(event: PageServerLoadEvent) {
  try {
    let document = await getDocument();

    // add a temporary line to trigger toolbars for empty documents
    if (!document?.lines.length) {
      document.lines.push({
      index: [0],
      content: "--------------",
      lines: [],
    });
  }
    return JSON.parse(JSON.stringify(document));
  } catch(e) {
    console.log(e);
    error(500, 'internal server error');
  }
}
