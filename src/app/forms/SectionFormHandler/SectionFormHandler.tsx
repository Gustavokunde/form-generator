import { Field, Input } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { styles } from '../../const/colors';
import { Metadata } from '../../interfaces/metadata';

interface Props {
  control: Control<Metadata>;
}

const SectionFormHandler = ({ control }: Props) => {
  const { append, fields, remove } = useFieldArray({
    name: 'sections',
    control,
  });

  const addNewSection = () => {
    append({ name: '', rows: [] });
  };

  return (
    <section className="flex flex-col gap-2 mt-2">
      {fields.map((section, sectionIndex) => (
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
                // style={{ backgroundColor: styles.primary }}
                contentAfter={
                  <button
                    disabled={fields.length === 0}
                    onClick={() => remove(sectionIndex)}
                  >
                    <DeleteRegular
                    // className={`text-${[styles.light]}`}
                    />
                  </button>
                }
              />
            </Field>
          )}
        />
      ))}
      <button
        className={`border-dashed border rounded p-2 text-left text-[${styles.primary}]`}
        onClick={addNewSection}
      >
        + Add section
      </button>
    </section>
  );
};

export default SectionFormHandler;
