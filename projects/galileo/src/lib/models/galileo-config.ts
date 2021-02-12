import {GalileoAvailableLanguages} from './galileo-available-languages';

export interface GalileoConfig {
  language: GalileoAvailableLanguages;
  dateFormats: {
    [GalileoAvailableLanguages.en]: string,
    [GalileoAvailableLanguages.it]: string
  };
}
