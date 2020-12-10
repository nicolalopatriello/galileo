import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalileoConfig} from './models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GalileoConfigService, GalileoThemeService} from './services';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons/faQuestionCircle';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faTrashAlt as faTrashAltRegular} from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class GalileoModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(faFilter,
      faQuestionCircle,
      faTrashAlt,
      faEyeSlash,
      faTrashAltRegular,
      faEye);
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
  return t;
}

