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


export const themeWithDarkSidebar: GalileoThemeInterface = {
  ...galileoCustomTheme,
  '--gll-sidenav-background': '#585858',
  '--gll-sidenav-item-active-color': '#dedede',
  '--gll-sidenav-item-bg-hover': '#959595',
  '--gll-sidenav-item-active-bg': '#929292',
   '--gll-sidnav-item-bg': '#585858',
  '--gll-sidenav-item-label-color': 'white'
}

export const themeWithDarkBreadcrumbs: GalileoThemeInterface = {
  ...galileoCustomTheme,
  '--gll-breadcrumb-bg': '#585858',
  '--gll-breadcrumb-label-color': '#ffffff'
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardContainerComponent
  ],
  imports: [
    GalileoTableModule,
    AppRoutingModule,
    BrowserModule,
    MarkdownModule.forRoot(),
    GalileoModule.forRoot({
      themesToRegister: [
        {name: 'galileoCustomTheme', theme: galileoCustomTheme},
        {name: 'themeWithDarkSidebar', theme: themeWithDarkSidebar},
        {name: 'themeWithDarkBreadcrumbs', theme: themeWithDarkBreadcrumbs},
      ]
    }),
    GalileoDashboardLayoutModule,
    GalileoSidebarModule,
    GalileoNavBarModule,
  ],
  providers: [GalileoThemeService, GalileoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

