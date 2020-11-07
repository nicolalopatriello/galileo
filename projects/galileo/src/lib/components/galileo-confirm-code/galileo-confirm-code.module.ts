import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalileoConfirmCodeComponent } from './galileo-confirm-code/galileo-confirm-code.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [GalileoConfirmCodeComponent],
  exports: [
    GalileoConfirmCodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GalileoConfirmCodeModule { }
