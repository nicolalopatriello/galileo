import {Inject, Injectable} from '@angular/core';
import {defaultTheme, GalileoThemeInterface} from '../styles/themes';
import {GalileoConfigService} from './galileo-config.service';
import {DOCUMENT} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GalileoThemeService {
  constructor(@Inject('GalileoConfigService') private config,
              @Inject(DOCUMENT) private document: any) {
  }


  /*This method allow us to set a new theme from .ts file as GalileoThemeInterface*/
  setThemeAsThemeInterface(theme: GalileoThemeInterface) {
    Object.keys(theme).forEach(v => {
      document.documentElement.style.setProperty(
        v, theme[v]
      );
    });
  }

  /*This method allow us to set a new theme from .scss file
  * as Galileo css variables (and so overrides also bootstrap vars)
  */
  setThemeAsScssFile(scssFileName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const themeLink = this.document.getElementById(
      'gll-client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = scssFileName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'gll-client-theme';
      style.rel = 'stylesheet';
      style.href = `${scssFileName}`;
      head.appendChild(style);
    }
  }


  initBaseTheme() {
    const t = defaultTheme;
    Object.keys(t).forEach(v => {
      document.documentElement.style.setProperty(
        v, t[v]
      );
    });
  }

}
