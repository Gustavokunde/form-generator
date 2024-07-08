import { useState } from "react";
import { Metadata } from "../interfaces/metadata";
const rowsSize = 3;


export const useMetadataCreation = () => {

const [metadata, setMetadata] = useState<Metadata>({
    sections: [
      {
        name: '',
        rows: [],
      },
    ],
  });


  const addNewRow = (sectionIndex: number) => {
    const { sections } = { ...metadata };
    sections[sectionIndex].rows.push(
      Array.from({ length: rowsSize }, () => ({ fieldType: '', size: '' }))
    );

    setMetadata({ sections });
  };

  const addNewSection = () => {
    const { sections } = { ...metadata };
    sections.push({ name: '', rows: [] });
    setMetadata({ sections });
  };


return { metadata, addNewRow, addNewSection}
};


