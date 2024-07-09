import {
  Menu,
  MenuItem,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  AlignSpaceEvenlyHorizontalRegular,
  DataUsageEditRegular,
  DeleteRegular,
  FlowchartRegular,
  MoreHorizontalFilled,
} from '@fluentui/react-icons';
import { Field, FieldSize } from '../../app/interfaces/metadata';
import { getDisableOption } from '../../utils/disableSizeField';

type MenuOptions = 'layoutRules' | 'edit' | 'delete';

const menuList: Array<FieldSize> = ['Small', 'Medium', 'Large', 'Extra-Large'];

interface Props {
  handleShowInputOptions: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onChangeFieldSize: (size: FieldSize) => void;
  onInputOptionsChoose: (data: MenuOptions) => void;
  data: Array<Field>;
  currentField: Field;
}

export const MenuOptions = ({
  handleShowInputOptions,
  onChangeFieldSize,
  onInputOptionsChoose,
  data,
  currentField,
}: Props) => {
  const handleFieldSizeChange = (size: FieldSize) => {
    onChangeFieldSize(size);
  };

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <button
          className="flex -ml-6 mr-3 relative items-center hover:text-[#af2b52]"
          onClick={handleShowInputOptions}
        >
          <MoreHorizontalFilled />
        </button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList
          onCheckedValueChange={(e, data) => {
            onInputOptionsChoose(data.checkedItems[0] as MenuOptions);
          }}
        >
          <MenuItemRadio value="layoutRules" name="fieldOptions" disabled>
            <FlowchartRegular /> Set Layout Rules
          </MenuItemRadio>
          <Menu
            onCheckedValueChange={(e, data) =>
              handleFieldSizeChange(data.checkedItems[0] as FieldSize)
            }
          >
            <MenuTrigger disableButtonEnhancement>
              <MenuItem>
                <AlignSpaceEvenlyHorizontalRegular /> Field Width{' '}
              </MenuItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {menuList.map((menuOption) => (
                  <MenuItemRadio
                    name="field-width"
                    value={menuOption}
                    disabled={getDisableOption(
                      data,
                      menuOption,
                      currentField.size
                    )}
                  >
                    {menuOption.replace('-', ' ')}
                  </MenuItemRadio>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
          <MenuItemRadio value="edit" name="fieldOptions">
            <DataUsageEditRegular /> Edit Field
          </MenuItemRadio>
          <MenuItemRadio value="delete" name="fieldOptions">
            <DeleteRegular /> Delete
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
