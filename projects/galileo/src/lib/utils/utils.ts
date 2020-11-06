import {Observable} from 'rxjs';

export class Utils {
  public static isObs<T>(headerName: T | Observable<T>) {
    return !!headerName && headerName instanceof Observable;
  }
}
