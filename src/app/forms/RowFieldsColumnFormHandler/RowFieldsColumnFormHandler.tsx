import { Combobox, Field, Option } from '@fluentui/react-components';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from 'react-hook-form';
import { MenuOptions } from '../../../components/MenuOptions/MenuOptions';
import { getDisableOption } from '../../../utils/disableSizeField';
import { getClassSizeOptions } from '../../../utils/size';
import { Metadata } from '../../interfaces/metadata';

interface Props {
  sectionIndex: number;
  rowIndex: number;
  control: Control<Metadata>;
  errors: FieldErrors<Metadata>;
}

const InputOptions = [
  'Title',
  'Summary for changes',
  'Revision for changes',
  'Is the document revision a pre-approved document?',
  'Follow Up Comment',
  'Check In Comment',
  'Is Maintainable',
  'Is Locked',
  'Follow Up Approval Due Date',
];

const RowFieldsFormHandler = ({
  sectionIndex,
  rowIndex,
  control,
  errors,
}: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows.${rowIndex}.fields`,
  });

  const handleShowInputOptions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const addField = () => {
    append({
      size: 'Small',
      fieldType: '',
    });
  };

  const onInputOptionsChoose = (
    data: 'layoutRules' | 'edit' | 'delete',
    fieldIndex: number
  ) => {
    const menuOptions = {
      delete: () => remove(fieldIndex),
      edit: () => {
        return;
      },
      layoutRules: () => {
        return;
      },
    };

    menuOptions[data]();
  };

  return (
    <>
      {fields.map((fieldValue, fieldIndex) => (
        <Controller
          control={control}
          name={`sections.${sectionIndex}.rows.${rowIndex}.fields.${fieldIndex}.fieldType`}
          render={({ field, fieldState: { error } }) => {
            console.log(field.value, 'value');
            return (
              <Field
                key={'field' + sectionIndex + rowIndex + fieldIndex}
                className={`flex ${getClassSizeOptions(fieldValue.size)}`}
                validationMessage={error?.message}
                validationState={error?.message ? 'error' : 'none'}
              >
                <Combobox
                  className="w-full"
                  placeholder="+ Add input"
                  expandIcon={null}
                  value={fieldValue.fieldType}
                  selectedOptions={[fieldValue.fieldType]}
                  onBlur={field.onBlur}
                  onOptionSelect={(e, data) => {
                    update(fieldIndex, {
                      ...fieldValue,
                      fieldType: data.optionValue!,
                    });
                  }}
                >
                  {InputOptions.map((option) => (
                    <Option key={option}>{option}</Option>
                  ))}
                </Combobox>
                <MenuOptions
                  onChangeFieldSize={(size) =>
                    update(fieldIndex, { ...fieldValue, size })
                  }
                  onInputOptionsChoose={(data) =>
                    onInputOptionsChoose(data, fieldIndex)
                  }
                  currentField={fieldValue}
                  data={fields}
                  handleShowInputOptions={handleShowInputOptions}
                />
              </Field>
            );
          }}
        />
      ))}
      {!getDisableOption(fields) && (
        <button className="bg-gray-100 rounded p-2" onClick={addField}>
          + Add a column
        </button>
      )}
    </>
  );
};

export default RowFieldsFormHandler;
