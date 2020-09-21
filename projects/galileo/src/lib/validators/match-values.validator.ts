import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchValues(
  matchTo: string // name of the control to match to
): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
    !!control.parent?.value &&
    control?.value === control.parent.controls[matchTo]?.value
      ? null
      : { isMatching: false };
  };
}
