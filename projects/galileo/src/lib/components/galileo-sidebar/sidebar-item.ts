import { Observable } from 'rxjs';

export interface SidebarItem {
  id: any;
  label: string;
  routerLink: string
  show: Observable<boolean>;
  active?: boolean;
  disabled?: boolean;
  faIcon?: any; //todo restore to IconProp
}
