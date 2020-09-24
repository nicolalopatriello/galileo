import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {FormsComponent} from './forms/forms.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GalileoFormsModule} from '@nicolalopatriello/galileo';


@NgModule({
  declarations: [FormsComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '', component: FormsComponent
    }]),
    GalileoFormsModule
  ]
})
export class FormsModule { }
