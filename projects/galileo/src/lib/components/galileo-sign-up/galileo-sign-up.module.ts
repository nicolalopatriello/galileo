import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [SignUpComponent]
})
export class GalileoSignUpModule { }
