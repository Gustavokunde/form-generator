import { Metadata } from 'src/app/interfaces/metadata';

const getMetadata = () => {
  //implement axios

  return Promise.resolve({
    label: '',
    viewType: 'Create',
    sections: [
      {
        name: '',
        rows: [],
      },
    ],
  } as Metadata);
};

export { getMetadata };
