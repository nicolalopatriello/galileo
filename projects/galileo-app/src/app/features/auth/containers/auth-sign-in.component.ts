import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SignAction, SignActionType} from '../../../../../../galileo/src/lib/models';

@Component({
  template: `
      <gll-sign-in [title]="'Sign In'"
                     [usernameLabel]="'Username'"
                     [passwordLabel]="'Password'"
                     [forgotPasswordLabel]="'Forgot password?'"
                     [signInButtonLabel]="'Signin'"
                     [signUpButtonLabel]="'Signup'"
                     (signAction)="onSignAction($event)">
      </gll-sign-in>`
})
export class AuthSignInComponent {


  constructor(
              private router: Router) {
  }

  onSignAction($event: SignAction) {
    switch ($event.action) {
      case SignActionType.SIGN_UP_REQUEST:
        return this.router.navigate(['auth/sign-up'])
      case SignActionType.FORGOT_PASSWORD:
        return this.router.navigate(['auth/forgot'])
    }
  }

}
