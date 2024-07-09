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

  const onSubmit = (values: unknown) => {
    saveMetadata(values as Metadata);
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
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return {
    dirtyFields,
    fetchMetadata,
    errors,
    control,
    changeMetadata: setValue,
    metadata: watch(),
    handleSubmit: handleSubmit,
    onSubmit,
  };
};
