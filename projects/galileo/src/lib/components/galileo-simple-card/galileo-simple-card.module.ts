import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleCardComponent } from './simple-card/simple-card.component';



@NgModule({
  declarations: [SimpleCardComponent],
  imports: [
    CommonModule
  ],
  exports: [SimpleCardComponent]
})
export class GalileoSimpleCardModule { }
