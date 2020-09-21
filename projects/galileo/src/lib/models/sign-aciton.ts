export interface SignAction {
  action: SignActionType;
  payload?: SignInRequest | SignUpRequest | ForgotRequest;
}

export interface SignInRequest {
  domain?: string;
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  privacy: boolean;
}

export interface ForgotRequest {
  domain: string;
  username: string;
  password: string;
}

export enum SignActionType {
  SIGN_IN_CONFIRM = 'SIGN_IN_CONFIRM',
  SIGN_UP_REQUEST = 'SIGN_UP_REQUEST',
  SIGN_UP_CONFIRM = 'SIGN_UP_CONFIRM',
  CANCEL = 'CANCEL',
  SHOW_PRIVACY = 'SHOW_PRIVACY',
  PRIVACY_CLOSE = 'PRIVACY_CLOSE',
  PRIVACY_CONFIRM = 'PRIVACY_CONFIRM',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORGOT_REQUEST_CODE = 'FORGOT_REQUEST_CODE',
  FORGOT_REQUEST_CHANGE = 'FORGOT_REQUEST_CHANGE'
}
