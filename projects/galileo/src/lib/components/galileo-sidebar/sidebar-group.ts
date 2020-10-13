import { Observable } from 'rxjs';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {SidebarItem} from './sidebar-item';

export interface SidebarGroup {
  items: SidebarItem[];
  groupLabel?: {label: Observable<string>, show: boolean, background: string, color: string, activeItemGroupBorderColor: string};
}
