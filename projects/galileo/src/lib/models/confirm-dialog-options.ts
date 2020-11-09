import {DialogType} from './dialog-type';
import {FontAwesomeIconColorBoolPair} from './font-awesome-icon-color-bool-pair';

export interface ConfirmDialogOptions {
  title: string;
  dismissButtonLabel?: string;
  confirmButtonLabel: string;
  body: string;
  dialogType: DialogType;
  confirmButtonCheck?: string;
  iconColorPair?: FontAwesomeIconColorBoolPair;
  dialogSize?: 'sm' | 'lg' | 'xl';
}
