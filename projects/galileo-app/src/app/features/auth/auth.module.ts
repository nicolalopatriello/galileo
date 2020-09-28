import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthSignInComponent} from './containers/auth-sign-in.component';
import {AuthSignUpComponent} from './containers/auth-sign-up.component';
import {AuthForgotPasswordComponent} from './containers/auth-forgot-password.component';
import {AuthComponent} from './auth.component';
import {GalileoSignInModule} from '../../../../../galileo/src/lib/components/galileo-sign-in/galileo-sign-in.module';
import {GalileoSignUpModule} from '../../../../../galileo/src/lib/components/galileo-sign-up/galileo-sign-up.module';
import {GalileoForgotModule} from '../../../../../galileo/src/lib/components/galileo-forgot/galileo-forgot.module';
import {GalileoAuthLayoutModule} from '../../../../../galileo/src/lib/components/galileo-auth-layout/galileo-auth-layout.module';



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
