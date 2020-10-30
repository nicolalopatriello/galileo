import { Observable } from 'rxjs';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {SidebarItem} from './sidebar-item';

export interface SidebarGroup {
  items: SidebarItem[];
  groupLabel?: {label: Observable<string>, show: Observable<boolean>, background: Observable<string>, color: Observable<string>, activeItemGroupBorderColor: Observable<string>};
}
