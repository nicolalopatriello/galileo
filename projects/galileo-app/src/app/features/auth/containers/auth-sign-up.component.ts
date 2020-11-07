import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SignAction, SignActionType} from '../../../../../../galileo/src/lib/models';

@Component({
  template: `
    <gll-sign-up [title]="'Sign Up'"
                   [usernameLabel]="'Username'"
                   [nameLabel]="'Name'"
                   [surnameLabel]="'Surname'"
                   [emailLabel]="'Email'"
                   [passwordLabel]="'Password'"
                   [confirmPasswordLabel]="'Confirm password'"
                   [cancelLabel]="'Cancel'"
                   [signUpLabel]="'Signup'"
                   (signAction)="onSignAction($event)"
    >
      <div class="w-100 d-flex flex-row justify-content-center mt-2">
        <button class="btn btn-outline-primary">Optional button</button>
      </div>
    </gll-sign-up>
  `
})
export class AuthSignUpComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSignAction($event: SignAction) {
    switch ($event.action) {
      case SignActionType.CANCEL:
        return this.router.navigate(['auth/sign-in'])
    }

  }
}
