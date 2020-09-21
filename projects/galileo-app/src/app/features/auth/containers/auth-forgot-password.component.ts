import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {SignAction, SignActionType} from '../../../../../../galileo/src/lib/models';

@Component({
  template: `
      <gll-forgot
              [title]="'Forgot password'"
              [domainLabel]="'Domain'"
              [usernameLabel]="'Username'"
              [sendRequestLabel]="'Confirm'"
              [codeLabel]="'Code'"
              [passwordLabel]="'Password'"
              [confirmPasswordLabel]="'Confirm password'"
              [cancelLabel]="'Cancel'"
              [updateRequestLabel]="'Update'"
              [closeLabel]="'Close'"
              (signAction)="onSignAction($event)">
      </gll-forgot>`
})
export class AuthForgotPasswordComponent {


  constructor(private router: Router) {
  }


  onSignAction($event: SignAction) {
    switch ($event.action) {
      case SignActionType.CANCEL:
        this.router.navigate(['auth', 'sign-in'])
    }
  }
}
