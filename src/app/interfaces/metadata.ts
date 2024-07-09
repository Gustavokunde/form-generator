export interface Metadata {
  label: string;
  viewType: 'Edit' | 'Create' | 'View';
  sections: Array<Section>;
}

export interface Section {
  name: string;
  rows: Array<Array<Field>>;
}

export interface Field {
  fieldType: string;
  size: FieldSize;
}

export type FieldSize = 'Small' | 'Medium' | 'Large' | 'Extra-Large';
