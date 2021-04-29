import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {GalileoConfig} from './models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GalileoConfigService, GalileoThemeService} from './services';
import localeEn from '@angular/common/locales/en';
import localeIt from '@angular/common/locales/it';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GalileoModule {

  constructor() {
  }

  static forRoot(config: GalileoConfig): ModuleWithProviders<GalileoModule> {
    return {
      ngModule: GalileoModule,
      providers: [
        NgbActiveModal,
        GalileoThemeService,
        {provide: APP_INITIALIZER, useFactory: initializeModule, multi: true, deps: [GalileoThemeService]},
        {
          provide: 'GalileoConfigService',
          useValue: config
        }
      ]
    };
  }
}

export function initializeModule(themeService: GalileoThemeService) {
  const t = () => themeService.initBaseTheme();
  registerLocaleData(localeEn);
  registerLocaleData(localeIt);
  return t;
}

