import { Observable } from 'rxjs';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface SidebarItem {
  id: any;
  label: string | Observable<string>;
  routerLink: string;
  show: Observable<boolean>;
  active?: boolean;
  disabled?: boolean;
  faIcon?: any; //todo restore to IconProp
}
