import {
  Combobox,
  Field,
  Input,
  makeStyles,
  Option,
} from '@fluentui/react-components';
import { useMetadataCreation } from '../../hooks/useMetadataCreation';

const options = ['title'];

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

  return (
    <>
      <Field label="View type">
        <Input />
      </Field>
      {metadata.sections.map((section, sectionIndex) => (
        <div className="flex flex-col" key={'section' + sectionIndex}>
          <span>section name</span>
          {section.rows.map((row, rowIndex) => (
            <div key={'row' + rowIndex}>
              {row.map((field, fieldIndex) => (
                <Field
                  className={styles.root}
                  // validationState="success"
                  // validationMessage="This is a success message."
                >
                  <Combobox placeholder="+ Add input">
                    {options.map((option) => (
                      <Option key={option} disabled={option === 'Ferret'}>
                        {option}
                      </Option>
                    ))}
                  </Combobox>
                </Field>
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
