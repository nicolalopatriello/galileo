import {FontAwesomeIconColorBoolPair} from '../../../models';

export enum UserMenuItemType {
  SEPARATOR,
  ITEM,
}

export interface NavBarUserMenuItem {
  type: UserMenuItemType;
  id?: any;
  label?: string;
  faIcon?: FontAwesomeIconColorBoolPair;
  disabled?: boolean;
}
