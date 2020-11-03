import {Component} from '@angular/core';
import {GalileoService} from '../../../../../../galileo/src/lib/services';
import {DialogType} from "../../../../../../galileo/src/lib/models";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styles: []
})
export class DialogsComponent {
  markDown = `
  \`galileoService.showConfirmDialog\` method allow use to show useful dialogs, for example:

\`\`\`markup
    this.galileoService.showConfirmDialog({
      title: 'Danger with confirm text',
      body: 'This is a body with some information',
      confirmButtonCheck: 'textToConfirm',
      confirmButtonLabel: 'ConfirmButton',
      dialogType: DialogType.DANGER,
      dismissButtonLabel: 'Dismiss',
    }).subscribe(t => {
      console.log(t);
    });
\`\`\`
  `;

  constructor(private galileoService: GalileoService) {
  }

  openDangerDialogWithConfirm() {
    this.galileoService.showConfirmDialog({
      title: 'Danger with confirm text',
      body: 'This is a body with some information',
      confirmButtonCheck: 'textToConfirm',
      confirmButtonLabel: 'ConfirmButton',
      dialogType: DialogType.DANGER,
      dismissButtonLabel: 'Dismiss',
    }).subscribe(t => {
      console.log(t);
    });
  }

  openDangerDialogWithoutConfirm() {
    this.galileoService.showConfirmDialog({
      title: 'Danger without confirm text',
      body: 'This is a body with some information',
      confirmButtonLabel: 'ConfirmButton',
      dialogType: DialogType.DANGER,
      dismissButtonLabel: 'Dismiss',
    }).subscribe(t => {
      console.log(t);
    });
  }

  openSuccessDialog() {
    this.galileoService.showConfirmDialog({
      title: 'Success dialog',
      body: 'This dialog show to user some good information. E.g: User successfully deleted',
      confirmButtonLabel: 'Got it',
      dialogType: DialogType.SUCCESS,
    }).subscribe(t => {
      console.log(t);
    });
  }

  openDangerDialog() {
    this.galileoService.showConfirmDialog({
      title: 'Success dialog',
      body: 'This dialog show to user some bad information. E.g: Failed to delete user',
      confirmButtonLabel: 'Got it',
      dialogType: DialogType.DANGER,
    }).subscribe(t => {
      console.log(t);
    });
  }
}
