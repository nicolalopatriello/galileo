// Generate by Georgy Alarcon georgy.alarcon@gfmintegration.it

import {Pipe, PipeTransform} from '@angular/core';
import {gllEn, gllIt} from './translations';
import {GalileoAvailableLanguages} from '../../../../models';
import {GalileoLanguageService} from '../../../../services';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Pipe({
  name: 'galileoTranslate'
})
export class GalileoTranslatePipe implements PipeTransform {

  constructor(private galileoLanguageService: GalileoLanguageService) {
  }

  transform(value: string, args?: any): Observable<string> {
    return this.galileoLanguageService.getLanguage().pipe(
      map((lang: GalileoAvailableLanguages) => {
        switch (lang) {
          case GalileoAvailableLanguages.en: {
            let r = gllEn[value];
            if (!!args) {
              r = this.setAdditionalParams(r, args[0]);
            }
            return r;
          }
          case GalileoAvailableLanguages.it: {
            let r = gllIt[value];
            if (!!args) {
              r = this.setAdditionalParams(r, args[0]);
            }
            return r;
          }
          default: {
            let r = gllEn[value];
            if (!!args) {
              r = this.setAdditionalParams(r, args[0]);
            }
            return r;
          }
        }
      })
    );
  }

  private setAdditionalParams(translations: string, args: any): any {
    const regx = RegExp(/{{(\w*)}}/, 'gm');
    const t = translations.match(regx);
    let output = translations;
    t?.forEach((value, index, array) => {
      const x = regx.exec(array[index]);
      const y = regx.exec(array[index + 1]);
      x.concat(y);
      if (!!x) {
        output = output.replace(x[0], args[x[1]]);
      }
    });
    return output;
  }
}

