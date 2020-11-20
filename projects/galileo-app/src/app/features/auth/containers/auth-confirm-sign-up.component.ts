import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GalieloConfirmCodeConfig} from '../../../../../../galileo/src/lib/models';

@Component({
  template: `
    <div class="d-flex vh-100 flex-column justify-content-center align-items-center">
      <p>Please insert here confirm code to confirm signup</p>
      <gll-confirm-code [config]="config" (confirmCodeFormChange)="onConfirmCodeFormChange($event)">
        <div class="d-flex justify-content-center mt-3">
          <button class="btn btn-outline-secondary">Optional back button</button>
        </div>
      </gll-confirm-code>
    </div>
  `
})
export class AuthConfirmSignUpComponent implements OnInit {
  config: GalieloConfirmCodeConfig = {
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '70px',
      height: '70px'
    },
  };

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  onConfirmCodeFormChange($event: { value: string; complete: boolean }) {
  }
}
