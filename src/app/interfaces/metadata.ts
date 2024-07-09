export interface Metadata {
  sections: Array<Section>;
}

interface Section {
  name: string;
  rows: Array<Array<Field>>;
}

export interface Field {
  fieldType: string;
  size: FieldSize;
}

export interface FieldOptions {
  fieldType: string;
  size: FieldSize;
}

export type FieldSize = 'Small' | 'Medium' | 'Large' | 'Extra-Large';
