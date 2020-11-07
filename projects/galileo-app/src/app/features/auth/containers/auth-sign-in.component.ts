import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SignAction, SignActionType} from '../../../../../../galileo/src/lib/models';

@Component({
  template: `
      <gll-sign-in [title]="'Sign In'"
                     [usernameLabel]="'Username'"
                     [passwordLabel]="'Password'"
                     [signInButtonLabel]="'Signin'"
                     [signUpButtonLabel]="'Signup'"
                     (signAction)="onSignAction($event)">
        <div class="w-100 d-flex justify-content-center flex-row mt-2 mb-2">
          <button class="btn btn-outline-primary">Optional guest button</button>
        </div>
      </gll-sign-in>

  `
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
