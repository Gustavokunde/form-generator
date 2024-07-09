import { Combobox, Field, Input, Option } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';
import { MenuOptions } from '../../../components/MenuOptions/MenuOptions';
import { getDisableOption } from '../../../utils/disableSizeField';
import { getClassSizeOptions } from '../../../utils/size';
import { useMetadataCreation } from '../../hooks/useMetadataCreation';

const InputOptions = ['title'];
const ViewTypeOptions = ['Create', 'Edit', 'View'];
const styles = {
  primary: '#291e87',
  secondary: '',
};

const CreateForm = () => {
  const {
    addNewRow,
    addNewSection,
    removeSection,
    metadata,
    addField,
    editField,
    deleteField,
  } = useMetadataCreation();

  const handleShowInputOptions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onInputOptionsChoose = (
    data: 'layoutRules' | 'edit' | 'delete',
    sectionIndex: number,
    rowIndex: number,
    fieldIndex: number
  ) => {
    const menuOptions = {
      delete: () => deleteField(sectionIndex, rowIndex, fieldIndex),
      edit: () => {},
      layoutRules: () => {},
    };

    menuOptions[data]();
  };

  return (
    <>
      <h1>Page Layout Builder</h1>
      <section className="flex">
        <Field label="Label" className="w-full">
          <Input />
        </Field>
        <Field label="View Type" className="w-full">
          <Combobox>
            {ViewTypeOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Combobox>
        </Field>
      </section>
      <div className="flex gap-2">
        <section className="flex flex-col gap-2 mt-2">
          {metadata.sections.map((section, sectionIndex) => (
            <Input
              key={'sectionInput' + sectionIndex}
              value={section.name}
              contentAfter={
                <button onClick={() => removeSection(sectionIndex)}>
                  <DeleteRegular />
                </button>
              }
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
          {metadata.sections.map((section, sectionIndex) => (
            <div className="flex flex-col gap-2" key={'section' + sectionIndex}>
              <span>section name</span>
              {section.rows.map((fields, rowIndex) => (
                <div
                  key={'row' + rowIndex + sectionIndex.toString()}
                  className="flex w-full"
                >
                  {fields.map((field, fieldIndex) => (
                    <div className={`flex ${getClassSizeOptions(field.size)}`}>
                      <Combobox
                        className="w-full"
                        placeholder="+ Add input"
                        expandIcon={null}
                      >
                        {InputOptions.map((option) => (
                          <Option key={option}>{option}</Option>
                        ))}
                      </Combobox>
                      <MenuOptions
                        onChangeFieldSize={(size) =>
                          editField(sectionIndex, rowIndex, fieldIndex, {
                            ...field,
                            size,
                          })
                        }
                        onInputOptionsChoose={(data) =>
                          onInputOptionsChoose(
                            data,
                            sectionIndex,
                            rowIndex,
                            fieldIndex
                          )
                        }
                        currentField={field}
                        data={fields}
                        handleShowInputOptions={handleShowInputOptions}
                      />
                    </div>
                  ))}
                  {!getDisableOption(fields) && (
                    <button
                      className="bg-gray-100 rounded p-2"
                      onClick={() => addField(sectionIndex, rowIndex)}
                    >
                      + Add a column
                    </button>
                  )}
                </div>
              ))}
              <button
                className="bg-gray-100 rounded p-2"
                onClick={() => addNewRow(sectionIndex)}
              >
                + Add Row
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default CreateForm;
