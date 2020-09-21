// Generate by Georgy Alarcon georgy.alarcon@gfmintegration.it

import { Pipe, PipeTransform } from '@angular/core';
import { gllEn, gllIt } from './translations';

@Pipe({
  name: 'galileoTranslate'
})
export class GalileoTranslatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const browserLang = navigator.language;
    switch (browserLang) {
      case GalileoLAng.EN: {
        let r = gllEn[value];
        if (!!args) {
          r = this.setAdditionalParams(r, args[0])
        }
        return r;
      }
      case GalileoLAng.IT: {
        let r = gllIt[value];
        if (!!args) {
          r = this.setAdditionalParams(r, args[0])
        }
        return r
      }
      default: {
        return gllEn[value];
      }
    }
  }

  private setAdditionalParams(translations: string, args: any) {
    const regx = RegExp(/{{(\w*)}}/, 'gm');
    const t = translations.match(regx);
    let output = translations;
    t?.forEach((value, index, array) => {
      const x = regx.exec(array[index]);
      const y = regx.exec(array[index + 1]);
      x.concat(y);
      if (!!x) {
        output = output.replace(x[0], args[x[1]])
      }
    });
    return output
  }
}

export enum GalileoLAng {
  EN = 'en',
  IT = 'it'
}
