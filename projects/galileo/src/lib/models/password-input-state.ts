export class PasswordInputState {
  private icon: PasswordInputStateIcon;
  private type: PasswordInputTypeState;

  constructor() {
    this.icon = PasswordInputStateIcon.EYE_CLOSED;
    this.type = PasswordInputTypeState.PASSWORD;
  }

  toggle() {
    this.type === PasswordInputTypeState.PASSWORD ?
      this.type = PasswordInputTypeState.TEXT : this.type = PasswordInputTypeState.PASSWORD;
    this.icon === PasswordInputStateIcon.EYE_CLOSED ?
      this.icon = PasswordInputStateIcon.EYE_OPENED : this.icon = PasswordInputStateIcon.EYE_CLOSED
  }

  get iconType(): PasswordInputStateIcon {
    return this.icon;
  }

  get inputType(): PasswordInputTypeState {
    return this.type;
  }

}

export enum PasswordInputStateIcon {
  EYE_CLOSED = 'visibility_off', // Material icons
  EYE_OPENED = 'visibility' // Material icons
}

export enum PasswordInputTypeState {
  PASSWORD = 'password',
  TEXT = 'text'
}
