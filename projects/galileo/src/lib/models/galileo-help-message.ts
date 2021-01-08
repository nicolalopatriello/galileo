import {Observable} from 'rxjs';

export interface GalileoHelpMessage {
  type: 'tooltip'; // to implement popover type
  message: string | Observable<string>;
}
