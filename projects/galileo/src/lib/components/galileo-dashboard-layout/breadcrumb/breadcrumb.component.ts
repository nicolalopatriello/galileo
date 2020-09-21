import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GllBreadCrumb} from './gll-breadcrumb';

@Component({
  selector: 'gll-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: GllBreadCrumb[];

}


