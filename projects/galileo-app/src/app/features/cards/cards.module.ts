import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CardsComponent} from './cards/cards.component';
import {GalileoSimpleCardModule} from '@nik_90/ngx-galileo';
import {MarkdownModule} from 'ngx-markdown';


@NgModule({
  declarations: [CardsComponent],
  imports: [
    MarkdownModule.forRoot(),
    GalileoSimpleCardModule,
    RouterModule.forChild([{
      path: '', component: CardsComponent
    }])
  ]
})
export class CardsModule { }
