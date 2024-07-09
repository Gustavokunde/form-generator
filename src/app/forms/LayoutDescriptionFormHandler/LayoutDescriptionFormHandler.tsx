import { Combobox, Field, Input, Option } from '@fluentui/react-components';
import { Control, Controller } from 'react-hook-form';
import { Metadata } from '../../interfaces/metadata';

interface Props {
  control: Control<Metadata>;
  changeMetadata: (field: string, data: string) => void;
}

const ViewTypeOptions = ['Create', 'Edit', 'View'];

const LayoutFormHandler = ({ control, changeMetadata }: Props) => {
  return (
    <section className="flex gap-4">
      <Controller
        control={control}
        name={'label'}
        render={({ field, fieldState: { error } }) => (
          <Field
            label="Label"
            className="w-full"
            validationMessage={error?.message}
            validationState={error?.message ? 'error' : 'none'}
          >
            <Input {...field} />
          </Field>
        )}
      />
      <Controller
        control={control}
        name={'viewType'}
        render={({ field, fieldState: { error } }) => (
          <Field
            label="View Type"
            className="w-full"
            validationMessage={error?.message}
            validationState={error?.message ? 'error' : 'none'}
          >
            <Combobox
              value={field.value}
              selectedOptions={[field.value]}
              onBlur={field.onBlur}
              onOptionSelect={(e, data) => {
                changeMetadata('viewType', data.optionValue!);
              }}
            >
              {ViewTypeOptions.map((option) => (
                <Option value={option} key={option}>
                  {option}
                </Option>
              ))}
            </Combobox>
          </Field>
        )}
      />
    </section>
  );
};

export default LayoutFormHandler;
