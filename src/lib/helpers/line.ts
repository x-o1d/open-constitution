import type { _Document, _Line } from "$lib/types/types";

export const toDisplayIndex = (indexArray: number[]) =>
  indexArray.reduce((a, c) => (a ? `${a}-${c + 1}` : `${c + 1}`), "");

export const getLine = (indexArray: number[], data: _Document): { line: _Line} => {
  let line: _Line | { lines: _Line[] } = { lines: data.lines };
    indexArray.forEach((i) => {
      line = line.lines[i];
    });
  return {
    line: line as _Line
  }
}

export const getParentLine = (indexArray: number[], data: _Document): { line: _Line, index: number } => {
  let line: _Line | { lines: _Line[] } = { lines: data.lines };
    const lastIndex = indexArray.pop();
    indexArray.forEach((i) => {
      line = line.lines[i];
    });
  return {
    line: line as _Line, 
    index: lastIndex as number
  }
}