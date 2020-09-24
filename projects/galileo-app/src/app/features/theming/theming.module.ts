import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {ThemingComponent} from './theming/theming.component';


@NgModule({
  declarations: [ThemingComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    RouterModule.forChild([{
      path: '', component: ThemingComponent
    }])
  ]
})
export class ThemingModule { }
