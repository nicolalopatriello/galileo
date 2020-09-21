import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styles: []
})
export class FormsComponent {
  markDown = `
  \`gll-form\` component allow us to create Forms based to Angular Reactive Forms.

  HTML side code is like this:

   \`gll-form\` wrap form with different \`gll-input\` (or \`gll-file-upload\`)

  \`errorsMessage\` input is a key-value where \`key\` comes from FormGroup Validators and \`value\` is our custom message.

\`\`\`markup
    <gll-form [showBuiltInButtons]="true"
                     [relativeFormGroup]="userFormGroup">
      <form [formGroup]="userFormGroup">
        <gll-input [label]="'Name'" inputLabelPosition="left"
                          [associatedFormGroup]="userFormGroup"
        [errorsMessages]="{'required': 'This field is required'}"
        >
          <input id="name" type="text" formControlName="name" class="form-control">
        </gll-input>
        <gll-input [label]="'Surname'" inputLabelPosition="left"
                   [associatedFormGroup]="userFormGroup"
                   [errorsMessages]="{'required': 'This field is another custom message'}"
        >
          <input id="surname" type="text" formControlName="surname" class="form-control">
        </gll-input>
      </form>
    </gll-form>
\`\`\`

Inside class just create FormGroup
\`\`\`typescript
  userFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required])
  });
\`\`\`
  `;
  userFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required])
  });

}
