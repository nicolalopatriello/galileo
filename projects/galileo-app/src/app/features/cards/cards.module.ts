import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CardsComponent} from './cards/cards.component';
import {MarkdownModule} from 'ngx-markdown';
import {GalileoSimpleCardModule} from '../../../../../galileo/src/lib/components/galileo-simple-card/galileo-simple-card.module';


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
