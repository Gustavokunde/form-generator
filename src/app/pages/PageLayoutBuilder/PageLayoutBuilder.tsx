import { Control, FieldErrors } from 'react-hook-form';
import SectionFormHandler from 'src/app/forms/SectionFormHandler/SectionFormHandler';
import LayoutDescriptionFormHandler from '../../forms/LayoutDescriptionFormHandler/LayoutDescriptionFormHandler';
import RowFormHandler from '../../forms/RowFormHandler/RowFormHandler';
import { useMetadataCreation } from '../../hooks/useMetadataCreation';
import { Metadata } from '../../interfaces/metadata';

const styles = {
  primary: '#120c46',
  secondary: '',
};

const PageLayoutBuilder = () => {
  const {
    metadata: { sections },
    control,
    errors,
    changeMetadata,
  } = useMetadataCreation();

  return (
    <>
      <h1>Page Layout Builder</h1>
      <LayoutDescriptionFormHandler
        control={control as unknown as Control<Metadata>}
        changeMetadata={(field, data) =>
          changeMetadata(field as 'label' | 'viewType', data)
        }
      />
      <div className="flex gap-2">
        <SectionFormHandler control={control as unknown as Control<Metadata>} />
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

export default PageLayoutBuilder;
