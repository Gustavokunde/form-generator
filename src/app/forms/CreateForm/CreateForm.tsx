import {
  Combobox,
  Field,
  Input,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Option,
} from '@fluentui/react-components';
import {
  AlignSpaceEvenlyHorizontalRegular,
  DataUsageEditRegular,
  DeleteRegular,
  FlowchartRegular,
  MoreHorizontalFilled,
} from '@fluentui/react-icons';
import { useMetadataCreation } from '../../hooks/useMetadataCreation';

const InputOptions = ['title'];
const ViewTypeOptions = ['Create', 'Edit', 'View'];
const styles = {
  primary: '#291e87',
};

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

const CreateForm = () => {
  const styles = useStyles();

  const { addNewRow, addNewSection, metadata } = useMetadataCreation();

  const handleInputOptions: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <h1>Page Layout Builder</h1>
      <section className="flex">
        <Field label="Label" className="w-full">
          <Input />
        </Field>
        <Field
          label="View Type"
          className="w-full"
          // validationState="success"
          // validationMessage="This is a success message."
        >
          <Combobox>
            {ViewTypeOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Combobox>
        </Field>
      </section>
      {metadata.sections.map((section, sectionIndex) => (
        <div className="flex flex-col" key={'section' + sectionIndex}>
          <span>section name</span>
          {section.rows.map((row, rowIndex) => (
            <div key={'row' + rowIndex}>
              {row.map((field, fieldIndex) => (
                <div
                  className="flex"
                  // validationState="success"
                  // validationMessage="This is a success message."
                >
                  <Combobox placeholder="+ Add input" expandIcon={null}>
                    {InputOptions.map((option) => (
                      <Option key={option}>{option}</Option>
                    ))}
                  </Combobox>
                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <button
                        className="flex -ml-6 relative items-center hover:text-[#af2b52]"
                        onClick={handleInputOptions}
                      >
                        <MoreHorizontalFilled />
                      </button>
                    </MenuTrigger>

                    <MenuPopover>
                      <MenuList>
                        <MenuItem disabled>
                          <FlowchartRegular /> Set Layout Rules
                        </MenuItem>
                        <Menu>
                          <MenuTrigger disableButtonEnhancement>
                            <MenuItem>
                              <AlignSpaceEvenlyHorizontalRegular /> Field Width{' '}
                            </MenuItem>
                          </MenuTrigger>
                          <MenuPopover>
                            <MenuList>
                              <MenuItem>Small</MenuItem>
                              <MenuItem>Medium</MenuItem>
                              <MenuItem>Large</MenuItem>
                              <MenuItem>Extra Large</MenuItem>
                            </MenuList>
                          </MenuPopover>
                        </Menu>
                        <MenuItem>
                          <DataUsageEditRegular /> Edit Field
                        </MenuItem>
                        <MenuItem>
                          <DeleteRegular /> Delete
                        </MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => addNewRow(sectionIndex)}>+Add row</button>
        </div>
      ))}
      <button onClick={addNewSection}>+Add section</button>
    </>
  );
};

export default CreateForm;
