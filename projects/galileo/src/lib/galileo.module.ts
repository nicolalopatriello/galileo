import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GalileoConfig} from './models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GalileoConfigService, GalileoService, GalileoThemeService} from './services';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class GalileoModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faQuestionCircle);
  }

  static forRoot(config: GalileoConfig): ModuleWithProviders<GalileoModule> {
    return {
      ngModule: GalileoModule,
      providers: [
        NgbActiveModal,
        GalileoThemeService,
        { provide: APP_INITIALIZER, useFactory: initializeModule, multi: true, deps: [GalileoThemeService] },
        {
          provide: 'GalileoConfigService',
          useValue: config
        }
      ]
    };
  }
}

export function initializeModule(themeService: GalileoThemeService) {
  const t =  () => themeService.initBaseTheme();
  return t;
}
