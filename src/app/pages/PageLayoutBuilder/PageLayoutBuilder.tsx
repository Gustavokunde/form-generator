import {
  Button,
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';
import { Control, FieldErrors } from 'react-hook-form';
import { styles } from '../../const/colors';
import LayoutDescriptionFormHandler from '../../forms/LayoutDescriptionFormHandler/LayoutDescriptionFormHandler';
import RowFormHandler from '../../forms/RowFormHandler/RowFormHandler';
import SectionFormHandler from '../../forms/SectionFormHandler/SectionFormHandler';
import { useMetadataCreation } from '../../hooks/useMetadataCreation';
import { Metadata } from '../../interfaces/metadata';

const PageLayoutBuilder = () => {
  const {
    metadata: { sections },
    control,
    errors,
    changeMetadata,
    handleSubmit,
    onSubmit,
  } = useMetadataCreation();

  return (
    <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Tree defaultOpenItems={[0]}>
            {sections.map((section, sectionIndex) => (
              <TreeItem itemType="branch" value={sectionIndex}>
                <TreeItemLayout expandIcon={{}}>{section.name}</TreeItemLayout>
                <Tree>
                  <RowFormHandler
                    key={sectionIndex + 'section'}
                    control={control as unknown as Control<Metadata>}
                    sectionIndex={sectionIndex}
                    errors={errors as FieldErrors<Metadata>}
                  />
                </Tree>
              </TreeItem>
            ))}
          </Tree>
        </section>
      </div>
      <footer className={`flex justify-end align-end h-full `}>
        <Button
          type="submit"
          className={`text-${styles.light}`}
          appearance="primary"
        >
          Save Design
        </Button>
      </footer>
    </form>
  );
};

export default PageLayoutBuilder;
