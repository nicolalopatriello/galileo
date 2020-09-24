import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {AuthLayoutsComponent} from './auth-layouts/auth-layouts.component';


@NgModule({
  declarations: [AuthLayoutsComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    RouterModule.forChild([{
      path: '', component: AuthLayoutsComponent
    }])
  ]
})
export class AuthLayoutsModule {
}
