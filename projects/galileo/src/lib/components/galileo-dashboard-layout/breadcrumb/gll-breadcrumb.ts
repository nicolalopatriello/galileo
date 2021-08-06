import {Observable} from 'rxjs';

export interface GllBreadCrumb {
  label: string | Observable<string>;
  url: string;
}
