import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {DialogsComponent} from './dialogs/dialogs.component';


@NgModule({
  declarations: [DialogsComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    RouterModule.forChild([{
      path: '', component: DialogsComponent
    }])
  ]
})
export class DialogsModule { }
