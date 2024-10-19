export interface _Line {
  id?: string;
  content: string;
  lines: _Line[];
  // local properties
  _editMode?: boolean;
  _newInsert?: boolean;
}

export interface _FDLine extends _Line {
  index: number[];
}
export interface _Document {
  lines: _Line[];
}

export type _FlatDocument = _FDLine[];