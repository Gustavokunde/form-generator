import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Metadata } from '../interfaces/metadata';
import { metadataValidation } from './metadataValidation';

export const useMetadataCreation = () => {
  const [metadata, setMetadata] = useState<Metadata>({
    label: '',
    viewType: 'Create',
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

  return {
    dirtyFields,
    fetchMetadata,
    errors,
    control,
    changeMetadata: setValue,
    metadata: getValues(),
  };
};
