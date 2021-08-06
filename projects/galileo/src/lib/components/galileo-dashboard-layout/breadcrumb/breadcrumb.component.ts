import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GllBreadCrumb} from './gll-breadcrumb';
import {Observable} from 'rxjs';
import {Utils} from '../../../utils/utils';

@Component({
  selector: 'gll-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  @Input() breadcrumbs: GllBreadCrumb[];

  navigate(url: string) {
    if (url !== null && url !== undefined) {
      this.router.navigate(url.split('/'));
    }
  }

  isObs(label: string | Observable<string>) {
    return Utils.isObs<string>(label);
  }

}


