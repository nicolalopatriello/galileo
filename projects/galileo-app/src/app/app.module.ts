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
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";


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
}

