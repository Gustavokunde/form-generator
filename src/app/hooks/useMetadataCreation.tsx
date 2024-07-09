import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Metadata } from '../interfaces/metadata';
import { getMetadata } from '../services/medatada/getMetadata';
import { saveMetadata } from '../services/medatada/saveMetadata';
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

  const fetchMetadata = async () => {
    const req = await getMetadata();
    setMetadata(req);
  };

  const onSubmit = (values: Metadata) => {
    saveMetadata(values);
  };
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: metadata,
    resolver: yupResolver(metadataValidation),
    mode: 'all',
    reValidateMode: 'onSubmit',
  });

  return {
    dirtyFields,
    fetchMetadata,
    errors,
    control,
    changeMetadata: setValue,
    metadata: watch(),
    handleSubmit: () => handleSubmit((values) => onSubmit(values as Metadata)),
  };
};
