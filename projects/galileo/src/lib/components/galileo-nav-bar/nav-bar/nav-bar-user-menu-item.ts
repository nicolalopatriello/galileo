import {FontAwesomeIconColorBoolPair} from '../../../models';
import {Observable} from "rxjs";

export enum UserMenuItemType {
  SEPARATOR,
  ITEM,
}

export interface NavBarUserMenuItem {
  type: UserMenuItemType;
  id?: any;
  label?: string | Observable<string>;
  faIcon?: FontAwesomeIconColorBoolPair;
  disabled?: boolean;
}
