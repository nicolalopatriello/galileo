/**
 * Usage: dateString | localDate:'format'
 **/

import {Inject, Pipe, PipeTransform} from '@angular/core';
import { formatDate } from '@angular/common';
import {GalileoLanguageService} from '../../../services';
import {GalileoAvailableLanguages} from '../../../models';

@Pipe({
  name: 'galileoDate'
})
export class GalileoDatePipe implements PipeTransform {
  private locale: string;
  private dateFormat: string;

  constructor(private languageService: GalileoLanguageService, @Inject('GalileoConfigService') private config) {
    this.dateFormat = config.dateFormat;
    this.languageService.getLanguage().subscribe(t => {
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
    if (!value) { return ''; }
    return formatDate(value, this.dateFormat, this.locale);
  }
}
