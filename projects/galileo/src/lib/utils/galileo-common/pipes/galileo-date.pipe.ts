/**
 * Usage: dateString | localDate:'format'
 **/

import {Inject, Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import {GalileoLanguageService} from '../../../services';
import {GalileoAvailableLanguages} from '../../../models';

@Pipe({
  name: 'galileoDate'
})
export class GalileoDatePipe implements PipeTransform {
  private language: GalileoAvailableLanguages;
  public dateFormats: Map<GalileoAvailableLanguages, string> = new Map<GalileoAvailableLanguages, string>();
  private locale: string;

  constructor(private languageService: GalileoLanguageService, @Inject('GalileoConfigService') private config) {
    this.dateFormats = config.dateFormats;
    this.languageService.getLanguage().subscribe(t => {
      this.language = t;
      switch (t) {
        case GalileoAvailableLanguages.en:
          this.locale = 'en-EN';
          break;
        case GalileoAvailableLanguages.it:
          this.locale = 'it-IT';
          break;
      }
    });
  }

  transform(value: any) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!value) {
      return '';
    }
    return formatDate(value, this.dateFormats[this.language], this.locale, tz);
  }
}
