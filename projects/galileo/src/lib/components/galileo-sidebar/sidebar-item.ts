import { Observable } from 'rxjs';

export interface SidebarItem {
  id: any;
  label: string | Observable<string>;
  routerLink?: string;
  show: Observable<boolean>;
  active?: boolean;
  disabled?: boolean;
  faIcon?: any; //todo restore to IconProp
  svgPath?: string;
}
