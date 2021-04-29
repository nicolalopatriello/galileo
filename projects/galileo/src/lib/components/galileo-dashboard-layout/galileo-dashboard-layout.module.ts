import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import {DlNavbarDirective} from './dl-navbar.directive';
import {DlSidebarDirective} from './dl-sidebar.directive';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {SidebarModule} from 'ng-sidebar';


export const sidebarModule = SidebarModule.forRoot();

@NgModule({
  declarations: [DashboardLayoutComponent, DlNavbarDirective, DlSidebarDirective, BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    sidebarModule,
  ], exports: [DashboardLayoutComponent, DlNavbarDirective, DlSidebarDirective]
})
export class GalileoDashboardLayoutModule { }
