import { useState } from 'react';
import { FieldOptions, Metadata } from '../interfaces/metadata';
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
      Array.from({ length: rowsSize }, () => ({ fieldType: '', size: 'small' }))
    );

    setMetadata({ sections });
  };

  const addNewSection = () => {
    const { sections } = { ...metadata };
    sections.push({ name: '', rows: [] });
    setMetadata({ sections });
  };

  const removeSection = (index: number) => {
    const { sections } = { ...metadata };
    sections.splice(index, 1);
    setMetadata({ sections });
  };

  const editField = (
    sectionIndex: number,
    rowIndex: number,
    fieldIndex: number,
    newValue: FieldOptions
  ) => {
    const { sections } = { ...metadata };
    sections[sectionIndex].rows[rowIndex][fieldIndex] = newValue;
    setMetadata({ sections });
  };

  const addField = (sectionIndex: number, rowIndex: number) => {
    const { sections } = { ...metadata };
    sections[sectionIndex].rows[rowIndex].push({
      size: 'small',
      fieldType: '',
    });
    setMetadata({ sections });
  };

  const deleteField = (
    sectionIndex: number,
    rowIndex: number,
    fieldIndex: number
  ) => {
    const { sections } = { ...metadata };
    sections[sectionIndex].rows[rowIndex].splice(fieldIndex, 1);
    setMetadata({ sections });
  };

  return {
    metadata,
    addNewRow,
    addNewSection,
    removeSection,
    editField,
    addField,
    deleteField,
  };
};
