import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignAction, SignActionType } from '../../../models';
import { PasswordInputState } from '../../../models';
@Component({
  selector: 'gll-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() logo?: string;

  @Input() domainLabel!: string;
  @Input() usernameLabel!: string;
  @Input() sendRequestLabel!: string;

  @Input() codeLabel!: string;
  @Input() passwordLabel!: string;
  @Input() confirmPasswordLabel!: string;

  @Input() cancelLabel!: string;
  @Input() updateRequestLabel!: string;

  @Input() closeLabel!: string;

  @Output() signAction = new EventEmitter<SignAction>();

  step: ForgotStep = ForgotStep.SEND_MAIL;
  enumForgotStep = ForgotStep;
  showSignupHeader = true;

  forgotRequestForm: FormGroup;
  passwordChangeRequestForm: FormGroup;
  passwordInputState = new PasswordInputState();

  @HostListener('window:resize', [])
  onResize() {
    this.showSignupHeader = window.innerHeight > 440;
  }

  constructor() {
  }

  onClickClose() {
    this.signAction.emit({
      action: SignActionType.CANCEL,
      args: undefined
    } as SignAction);
  }

  public setStep1SendMail() {
    this.step = ForgotStep.SEND_MAIL;
    this.forgotRequestForm.reset();
  }

  public setStep2UpdatePassword() {
    this.step = ForgotStep.SEND_UPDATE;
    this.passwordChangeRequestForm.controls.domain.setValue(this.forgotRequestForm.controls.domain.value);
    this.passwordChangeRequestForm.controls.username.setValue(this.forgotRequestForm.controls.username.value);
  }

  public setStepSuccess() {
    this.step = ForgotStep.SUCCESS;
  }

  public setStepFailed() {
    this.step = ForgotStep.FAILED;
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : {isMatching: false};
    };
  }

  ngOnInit(): void {
    this.onResize();
    this.reset();
  }

  cancel() {
    this.reset();
    this.signAction.emit({
      action: SignActionType.CANCEL,
      args: undefined
    } as SignAction);
  }

  public reset() {
    this.forgotRequestForm = new FormGroup({
      domain: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });

    this.passwordChangeRequestForm = new FormGroup({
      domain: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    });
  }


  onForgotRequestFormSubmit() {
    const request = {
      domain: this.forgotRequestForm.controls.domain.value,
      username: this.forgotRequestForm.controls.username.value
    };
    this.signAction.emit({
      action: SignActionType.FORGOT_REQUEST_CODE,
      args: request
    } as SignAction);
  }


  onForgotChangeFormSubmit() {
    const request = {
      domain: this.forgotRequestForm.controls.domain.value,
      username: this.forgotRequestForm.controls.username.value,
      password: this.passwordChangeRequestForm.controls.password.value
    };
    this.signAction.emit({
      action: SignActionType.FORGOT_REQUEST_CHANGE,
      args: request
    } as SignAction);
  }

}
enum ForgotStep {
  SEND_MAIL = 'SEND_MAIL',
  SEND_UPDATE = 'SEND_UPDATE',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}
