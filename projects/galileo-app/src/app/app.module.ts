import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {galileoCustomTheme} from '../themes/galileoCustomTheme';
import {DashboardContainerComponent} from './features/dashboard-container/dashboard-container.component';
import {MarkdownModule} from 'ngx-markdown';
import {GalileoThemeInterface} from '@nicolalopatriello/galileo';
import {GalileoSidebarModule} from '../../../galileo/src/lib/components/galileo-sidebar/galileo-sidebar.module';
import {GalileoNavBarModule} from '../../../galileo/src/lib/components/galileo-nav-bar/galileo-nav-bar.module';
import {GalileoDashboardLayoutModule} from '../../../galileo/src/lib/components/galileo-dashboard-layout/galileo-dashboard-layout.module';
import {GalileoService, GalileoThemeService} from '../../../galileo/src/lib/services';
import {GalileoModule} from '../../../galileo/src/lib/galileo.module';
import {GalileoTableModule} from '../../../galileo/src/lib/components/galileo-table/galileo-table.module';
import {GalileoAvailableLanguages} from '../../../galileo/src/lib/models';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowAltCircleRight';
import {faWindowMaximize} from '@fortawesome/free-solid-svg-icons/faWindowMaximize';
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faFillDrip} from "@fortawesome/free-solid-svg-icons/faFillDrip";
import {faAlignJustify} from "@fortawesome/free-solid-svg-icons/faAlignJustify";
import {faLayerGroup} from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons/faAddressCard";
import {faTable} from "@fortawesome/free-solid-svg-icons/faTable";
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


@NgModule({
  declarations: [
    AppComponent,
    DashboardContainerComponent
  ],
  imports: [
    NgbPopoverModule,
    GalileoTableModule,
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    MarkdownModule.forRoot(),
    GalileoModule.forRoot({
      language: GalileoAvailableLanguages.EN
    }),
    GalileoDashboardLayoutModule,
    GalileoSidebarModule,
    GalileoNavBarModule,
    ReactiveFormsModule,
  ],
  providers: [GalileoThemeService, GalileoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faArrowAltCircleRight,
      faWindowMaximize,
      faUser,
      faFillDrip,
      faAlignJustify,
      faLayerGroup,
      faAddressCard,
      faTable,
      faAngleDoubleLeft,
      faUserShield,
    );
  }
}

