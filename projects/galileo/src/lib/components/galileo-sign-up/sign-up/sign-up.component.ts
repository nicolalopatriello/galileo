import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordInputState, SignAction, SignActionType, SignUpRequest } from '../../../models';
import { EMAIL_REGEX, matchValues } from '../../../validators';

@Component({
  selector: 'gll-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() logo?: string;

  @Input() usernameLabel!: string;
  @Input() nameLabel!: string;
  @Input() surnameLabel!: string;
  @Input() emailLabel!: string;
  @Input() passwordLabel!: string;
  @Input() confirmPasswordLabel!: string;
  @Input() disclaimerLabel!: string;

  @Input() cancelLabel!: string;
  @Input() signUpLabel!: string;

  @Output() signAction = new EventEmitter<SignAction>();


  signUpFormGroup: FormGroup;
  passwordInputState = new PasswordInputState();

  ngOnInit(): void {
    this.buildSignUpFormGroup();
  }

  showPrivacy() {
    this.signAction.emit({
      action: SignActionType.SHOW_PRIVACY,
      args: undefined
    } as SignAction);
  }

  cancel() {
    this.buildSignUpFormGroup();
    this.signAction.emit({
      action: SignActionType.CANCEL,
      args: undefined
    } as SignAction);
  }

  public buildSignUpFormGroup() {
    this.signUpFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, matchValues('password')]),
      disclaimer: new FormControl({ value: false, disabled: true }, [Validators.requiredTrue])
    });
  }

  public confirmPrivacy() {
    this.signUpFormGroup.controls.disclaimer.setValue(true);
  }

  public refusePrivacy() {
    this.signUpFormGroup.controls.disclaimer.setValue(false);
  }

  onSignUpFormSubmit() {
    const payload = this.signUpFormGroup.getRawValue();
    this.signAction.emit({
      action: SignActionType.SIGN_UP_CONFIRM,
      payload
    } as SignAction);
  }

}
