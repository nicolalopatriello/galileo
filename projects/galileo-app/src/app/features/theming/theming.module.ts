import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {ThemingComponent} from './theming/theming.component';
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [ThemingComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    NgbPopoverModule,
    RouterModule.forChild([{
      path: '', component: ThemingComponent
    }])
  ]
})
export class ThemingModule {
}
