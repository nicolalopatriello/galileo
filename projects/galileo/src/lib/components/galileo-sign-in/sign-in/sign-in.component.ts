import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignAction, SignActionType } from '../../../models';
import { PasswordInputState } from '../../../models';

@Component({
  selector: 'gll-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() logoSrc: string;
  @Input() domainLabel: string;
  @Input() usernameLabel: string;
  @Input() passwordLabel: string;
  @Input() forgotPasswordLabel: string;
  @Input() signInButtonLabel: string;
  @Input() signUpButtonLabel: string;
  @Input() formBackground: string = null;

  @Output() signAction = new EventEmitter<SignAction>();


  loginFormGroup: FormGroup;
  passwordInputState = new PasswordInputState();
  public forceEnabled: boolean;

  constructor() {
    /*
    * Related to:
    * https://github.com/angular/components/issues/3414
    * If Chrome autofill is enabled, Angular fails to detect form validation.
    * So in this case btn status is forced to enabled.
    * */
    this.forceEnabled = false;
    document.addEventListener('onautocomplete', (e) => {
      this.forceEnabled = true;
    });
  }

  ngOnInit(): void {
    this.buildLoginFormGroup();
  }

  forgotPassword() {
    this.signAction.emit({
      action: SignActionType.FORGOT_PASSWORD,
      args: undefined
    } as SignAction);
  }

  signUp() {
    this.signAction.emit({
      action: SignActionType.SIGN_UP_REQUEST,
      payload: null
    } as SignAction);
  }

  public buildLoginFormGroup() {
    this.loginFormGroup = new FormGroup({
      domain: new FormControl('', !!this.domainLabel ? [Validators.required] : []),
      username: new FormControl('', !!this.usernameLabel ? [Validators.required] : []),
      password: new FormControl('', !!this.passwordLabel ? [Validators.required] : [])
    });
  }


  signIn() {
    const payload = this.loginFormGroup.getRawValue();
    this.signAction.emit({
      action: SignActionType.SIGN_IN_CONFIRM,
      payload
    } as SignAction);
  }

  fixAutoFill($event: Event, value) {
    console.log('change from usrname');
  }
}
