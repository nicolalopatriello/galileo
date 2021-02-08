import {DialogType} from './dialog-type';
import {FontAwesomeIconColorBoolPair} from './font-awesome-icon-color-bool-pair';
import {Observable} from 'rxjs';

export interface ConfirmDialogOptions {
  title: string | Observable<string>;
  dismissButtonLabel?: string | Observable<string>;
  confirmButtonLabel: string | Observable<string>;
  body: string | Observable<string>;
  dialogType: DialogType;
  confirmButtonCheck?: string | Observable<string>;
  iconColorPair?: FontAwesomeIconColorBoolPair;
  dialogSize?: 'sm' | 'lg' | 'xl';
}
