import type { _Document, _FDLine, _Line } from "$lib/types/types";

// creates an indexed flat document, this method needs to be called 
// anytime the document is updated
export function flatten (document: _Document): _FDLine[] {
  const flatDocument:_FDLine[] = [];

  const insertToDocument = (lines: _Line[], indexArray: number[] = []) => {
    lines.forEach((line, index )=> {
      const lineIndexArray = [...indexArray, index];
      flatDocument.push({
        ...line, 
        index: lineIndexArray
      });
      if(line.lines && line.lines.length) {
        insertToDocument(line.lines, lineIndexArray);
      }
    })
  }

  insertToDocument(document.lines);

  return flatDocument;
}