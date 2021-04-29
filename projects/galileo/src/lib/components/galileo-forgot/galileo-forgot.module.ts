import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ForgotComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [ForgotComponent]
})
export class GalileoForgotModule { }
