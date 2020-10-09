import { GalileoThemeInterface } from '../styles/themes/models';
import {GalileoAvailableLanguages} from './galileo-available-languages';

export interface GalileoConfig {
  themesToRegister?: ThemeToRegisterInterface[];
  language: GalileoAvailableLanguages;
}

export interface ThemeToRegisterInterface {
  name: string;
  theme: GalileoThemeInterface;
}

