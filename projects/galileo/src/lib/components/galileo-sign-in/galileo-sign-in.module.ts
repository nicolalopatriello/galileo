import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [SignInComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [SignInComponent]
})
export class GalileoSignInModule {
}
