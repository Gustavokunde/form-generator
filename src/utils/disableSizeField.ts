import { Field, FieldSize } from '../app/interfaces/metadata';
import { getClassSizeOptions, getFieldWidthInDecimal } from './size';

export const getDisableOption = (
  data: Array<Field>,
  size?: FieldSize,
  currentFieldSize?: FieldSize
) => {
  if (data.length === 1 && currentFieldSize) return false;
  let availableSize = 1;

  data.forEach((field) => {
    const currentSize = getFieldWidthInDecimal(getClassSizeOptions(field.size));
    availableSize = Number(Number(availableSize - currentSize).toFixed(2));
  });

  if (currentFieldSize) {
    const currentFieldWidth = getFieldWidthInDecimal(
      getClassSizeOptions(currentFieldSize)
    );
    availableSize += currentFieldWidth;
  }

  switch (size) {
    case 'Small':
      return false;
    case 'Medium': {
      return availableSize <= 1 / 2;
    }
    case 'Large':
      return availableSize <= 4 / 6;
    case 'Extra-Large':
      return availableSize <= 1;
    default:
      return availableSize < 0.3;
  }
};
