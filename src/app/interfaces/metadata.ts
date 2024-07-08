export interface Metadata {
  sections: Array<Section>;
}

interface Section {
  name: string;
  rows: Array<Array<Row>>;
}

interface Row {
  fieldType: string;
  size: FieldSize;
}

export interface FieldOptions {
  fieldType: string;
  size: FieldSize;
}

export type FieldSize = 'small' | 'medium' | 'large' | 'extra-large';
