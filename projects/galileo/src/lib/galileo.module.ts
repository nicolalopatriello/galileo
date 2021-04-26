import {APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalileoConfig} from './models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GalileoConfigService, GalileoLanguageService, GalileoThemeService} from './services';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons/faQuestionCircle';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faTrashAlt as faTrashAltRegular} from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeIt from '@angular/common/locales/it';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {faUserTag} from '@fortawesome/free-solid-svg-icons/faUserTag';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';


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
      faTrash,
      faEyeSlash,
      faTrashAltRegular,
      faAngleDoubleRight,
      faAngleDoubleLeft,
      faEye,
      faEllipsisV,
      faAlignJustify,
      faExclamationCircle,
      faCalendar,
      faTimesCircle,
      faSignOutAlt,
      faUserTag,
      faArrowCircleRight,
      faTrash,
    );
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

