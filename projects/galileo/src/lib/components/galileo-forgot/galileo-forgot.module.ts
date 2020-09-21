import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [ForgotComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [ForgotComponent]
})
export class GalileoForgotModule { }
