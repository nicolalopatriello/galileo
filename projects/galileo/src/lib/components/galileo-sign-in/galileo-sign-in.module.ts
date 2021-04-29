import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [SignInComponent]
})
export class GalileoSignInModule {
}
