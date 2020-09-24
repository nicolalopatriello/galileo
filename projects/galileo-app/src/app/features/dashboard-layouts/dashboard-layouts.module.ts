import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {DashboardLayoutsComponent} from './dashboard-layouts/dashboard-layouts.component';


@NgModule({
  declarations: [DashboardLayoutsComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    RouterModule.forChild([{
      path: '', component: DashboardLayoutsComponent
    }])
  ]
})
export class DashboardLayoutsModule {
}
