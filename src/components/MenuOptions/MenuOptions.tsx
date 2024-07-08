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
import { FieldSize } from '../../app/interfaces/metadata';

type MenuOptions = 'layoutRules' | 'edit' | 'delete';

interface Props {
  handleShowInputOptions: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onChangeFieldSize: (size: FieldSize) => void;
  onInputOptionsChoose: (data: MenuOptions) => void;
}

export const MenuOptions = ({
  handleShowInputOptions,
  onChangeFieldSize,
  onInputOptionsChoose,
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
                <MenuItemRadio name="field-width" value="small">
                  Small
                </MenuItemRadio>
                <MenuItemRadio name="field-width" value="medium">
                  Medium
                </MenuItemRadio>
                <MenuItemRadio name="field-width" value="large">
                  Large
                </MenuItemRadio>
                <MenuItemRadio name="field-width" value="extra-large">
                  Extra Large
                </MenuItemRadio>
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
