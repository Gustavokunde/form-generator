import { useState } from "react";
const rowsSize = 3;

const useMetadataCreation = () => {

const [metadata, setMetadata] = useState({
    sections: [
      {
        name: '',
        id: '',
        rows: [
          [
            { fieldType: 'Title', size: 'small' },
            { fieldType: 'Title', size: 'small' },
            { fieldType: 'Title', size: 'small' },
          ],
        ],
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
    sections.push({ name: '', id: '', rows: [] });
    setMetadata({ sections });
  };


return { metadata, addNewRow, addNewSection}
};


export { useMetadataCreation };
