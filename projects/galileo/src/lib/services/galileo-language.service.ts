import {Inject, Injectable} from '@angular/core';
import {GalileoConfigService} from './galileo-config.service';
import {GalileoAvailableLanguages} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GalileoLanguageService {
  private currentLanguage: BehaviorSubject<GalileoAvailableLanguages> = new BehaviorSubject<GalileoAvailableLanguages>(GalileoAvailableLanguages.en);

  constructor(@Inject('GalileoConfigService') private config) {
    this.currentLanguage.next(config.language);
  }

  setLanguage(language: GalileoAvailableLanguages) {
    this.currentLanguage.next(language);
  }

  getLanguage(): Observable<GalileoAvailableLanguages> {
    return this.currentLanguage.asObservable();
  }

}
