import {Observable} from 'rxjs';

export interface FontAwesomeIconColorBoolPair {
    icon: any;
    color: string;
    tooltip?: string | Observable<string>;
}
