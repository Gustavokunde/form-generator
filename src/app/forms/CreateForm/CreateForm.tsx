import { Combobox, Field, Input, Option } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Metadata } from 'src/app/interfaces/metadata';
import { useMetadataCreation } from '../../hooks/useMetadataCreation';
import RowFormHandler from '../RowFormHandler/RowFormHandler';

const ViewTypeOptions = ['Create', 'Edit', 'View'];
const styles = {
  primary: '#120c46',
  secondary: '',
};

const CreateForm = () => {
  const {
    addNewSection,
    deleteSection,
    sections,
    control,
    errors,
    changeMetadata,
  } = useMetadataCreation();

  return (
    <>
      <h1>Page Layout Builder</h1>
      <section className="flex">
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
                  <Option key={option}>{option}</Option>
                ))}
              </Combobox>
            </Field>
          )}
        />
      </section>
      <div className="flex gap-2">
        <section className="flex flex-col gap-2 mt-2">
          {sections.map((section, sectionIndex) => (
            <Controller
              key={section.name || '' + sectionIndex}
              control={control}
              name={`sections.${sectionIndex}.name`}
              render={({ field, fieldState: { error } }) => (
                <Field
                  validationMessage={error?.message}
                  validationState={error?.message ? 'error' : 'none'}
                >
                  <Input
                    {...field}
                    key={'sectionInput' + sectionIndex}
                    contentAfter={
                      <button onClick={() => deleteSection(sectionIndex)}>
                        <DeleteRegular />
                      </button>
                    }
                  />
                </Field>
              )}
            />
          ))}
          <button
            className="border-dashed border rounded p-2 text-left"
            onClick={addNewSection}
          >
            + Add section
          </button>
        </section>
        <section className="mt-2 w-full">
          {sections.map((section, sectionIndex) => (
            <RowFormHandler
              key={sectionIndex + 'section'}
              control={control as unknown as Control<Metadata>}
              sectionIndex={sectionIndex}
              sectionName={section.name}
              errors={errors as FieldErrors<Metadata>}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default CreateForm;
