import { GalileoThemeInterface } from '../styles/themes/models';

export interface GalileoConfig {
  themesToRegister?: ThemeToRegisterInterface[],
}

export interface ThemeToRegisterInterface {
  name: string;
  theme: GalileoThemeInterface;
}
