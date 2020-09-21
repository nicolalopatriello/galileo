import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GalileoAuthLayoutModule,
  GalileoForgotModule,
  GalileoSignInModule,
  GalileoSignUpModule
} from '@nik_90/ngx-galileo';
import {RouterModule} from '@angular/router';
import {AuthSignInComponent} from './containers/auth-sign-in.component';
import {AuthSignUpComponent} from './containers/auth-sign-up.component';
import {AuthForgotPasswordComponent} from './containers/auth-forgot-password.component';
import {AuthComponent} from './auth.component';



@NgModule({
  declarations: [AuthComponent, AuthSignUpComponent, AuthSignInComponent, AuthForgotPasswordComponent],
  imports: [
    CommonModule,
    GalileoSignInModule,
    GalileoSignUpModule,
    GalileoForgotModule,
    GalileoAuthLayoutModule,
    RouterModule.forChild([
      {
        path: '', component: AuthComponent, children: [
          { path: '', redirectTo: 'sign-in' },
          { path: 'sign-in', component: AuthSignInComponent },
          { path: 'sign-up', component: AuthSignUpComponent },
          { path: 'forgot', component: AuthForgotPasswordComponent }
        ]
      }
    ]),
  ]
})
export class AuthModule { }
