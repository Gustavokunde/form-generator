import {
  Button,
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';
import { Control, FieldErrors } from 'react-hook-form';
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
  } = useMetadataCreation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
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
          <Tree>
            {sections.map((section, sectionIndex) => (
              <TreeItem itemType="branch">
                <TreeItemLayout>{section.name}</TreeItemLayout>
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
      <footer className="flex justify-end align-end h-full">
        <Button appearance="outline">Save Design</Button>
      </footer>
    </form>
  );
};

export default PageLayoutBuilder;
