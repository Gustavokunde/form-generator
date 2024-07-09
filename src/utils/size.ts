import { FieldSize } from 'src/app/interfaces/metadata';

export const getClassSizeOptions = (size: FieldSize) => {
  const sizes: { [K in FieldSize]: string } = {
    Small: 'w-1/3',
    Medium: 'w-1/2',
    Large: 'w-4/6',
    'Extra-Large': 'w-full',
  };
  return sizes[size];
};

export const getFieldWidthInDecimal = (classSize: string) => {
  const [dividend, divider] = classSize
    .replace('w-', '')
    .replace('full', '1/1')
    .split('/');
  return Number((Number(dividend) / Number(divider)).toFixed(2));
};
