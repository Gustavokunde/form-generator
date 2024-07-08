export interface Metadata {
    sections: Array<Section>;
}

interface Section {
    name: string;
    rows: Array<Array<Row>>;
    
}

interface Row{
    fieldType: string;
    size: string;
}