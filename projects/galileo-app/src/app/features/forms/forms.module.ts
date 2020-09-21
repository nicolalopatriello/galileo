import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {GalileoSimpleCardModule} from '@nik_90/ngx-galileo';
import {MarkdownModule} from 'ngx-markdown';
import {FormsComponent} from './forms/forms.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GalileoFormsModule} from 'galileo';


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
