import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [SignUpComponent]
})
export class GalileoSignUpModule { }
