import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { Metadata } from '../../interfaces/metadata';
import RowFieldsColumnFormHandler from '../RowFieldsColumnFormHandler/RowFieldsColumnFormHandler';

interface Props {
  sectionIndex: number;
  sectionName?: string;
  control: Control<Metadata>;
  errors: FieldErrors<Metadata>;
}

const rowsSize = 3;

const RowFormHandler = ({
  control,
  sectionName,
  sectionIndex,
  errors,
}: Props) => {
  const { append, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows`,
  });

  return (
    <div className="flex flex-col gap-2" key={'section' + sectionIndex}>
      <span>{sectionName}</span>
      {fields.map((row, rowIndex) => (
        <div
          key={'row' + rowIndex + sectionIndex.toString()}
          className="flex w-full"
        >
          <RowFieldsColumnFormHandler
            control={control as unknown as Control<Metadata>}
            sectionIndex={sectionIndex}
            rowIndex={rowIndex}
            errors={errors}
          />
        </div>
      ))}
      <button
        className="bg-gray-100 rounded p-2"
        onClick={() =>
          append([
            Array.from({ length: rowsSize }, () => ({
              fieldType: '',
              size: 'Small',
            })),
          ])
        }
      >
        + Add Row
      </button>
    </div>
  );
};

export default RowFormHandler;
