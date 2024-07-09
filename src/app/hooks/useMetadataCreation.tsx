import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Metadata } from '../interfaces/metadata';
import { metadataValidation } from './metadataValidation';

export const useMetadataCreation = () => {
  const [metadata, setMetadata] = useState<Metadata>({
    label: '',
    viewType: 'create',
    sections: [
      {
        name: '',
        rows: [],
      },
    ],
  });

  const fetchMetadata = (req: Metadata) => {
    setMetadata(req);
  };

  const {
    control,
    getValues,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: metadata,
    resolver: yupResolver(metadataValidation),
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const { append, fields, remove } = useFieldArray({
    name: 'sections',
    control,
  });

  const addNewSection = () => {
    append({ name: '', rows: [] });
  };

  return {
    dirtyFields,
    fetchMetadata,
    errors,
    control,
    changeMetadata: setValue,
    sections: fields,
    metadata: getValues(),
    addNewSection,
    deleteSection: remove,
  };
};
