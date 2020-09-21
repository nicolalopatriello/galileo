import { Inject, Injectable } from '@angular/core';
import { darkTheme, GalileoThemeInterface } from '../styles/themes';
import { defaultTheme } from '../styles/themes';
import { GalileoConfigService } from './galileo-config.service';
import { DefaultThemesName } from '../styles/themes';


@Injectable({
  providedIn: 'root'
})
export class GalileoThemeService {
  constructor(@Inject('GalileoConfigService') private config) {
    if (!!config.themesToRegister) {
      config.themesToRegister.forEach(t => {
        this.addNewTheme(t.name, t.theme);
      });
    }
  }

  private THEMES_LIST: Map<DefaultThemesName | string, GalileoThemeInterface> = new Map<DefaultThemesName | string, GalileoThemeInterface>()
    .set(DefaultThemesName.DARK, darkTheme)
    .set(DefaultThemesName.DEFAULT, defaultTheme);

  private currentTheme: string = DefaultThemesName.DEFAULT;

  setTheme(themeName: DefaultThemesName | string) {
    console.log('[DEBUG] Set theme to: ' + themeName);
    this.currentTheme = themeName;
    const t = this.THEMES_LIST.get(themeName);
    Object.keys(t).forEach(v => {
      document.documentElement.style.setProperty(
        v, t[v]
      );
    });
  }

  addNewTheme(themeName: string, themeInterface: GalileoThemeInterface) {
    if (this.THEMES_LIST.has(themeName)) {
      throw new Error('Theme with this name already exist');
    }
    this.THEMES_LIST.set(themeName, themeInterface);
  }

  get currentThemeName(): string {
    return this.currentTheme;
  }

  get themesList(): string[] {
    return Array.from(this.THEMES_LIST.keys());
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
