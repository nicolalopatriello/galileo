import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {galileoCustomTheme} from '../themes/galileoCustomTheme';
import {DashboardContainerComponent} from './features/dashboard-container/dashboard-container.component';
import {
  GalileoDashboardLayoutModule,
  GalileoModule,
  GalileoNavBarModule,
  GalileoService,
  GalileoSidebarModule,
  GalileoTableModule,
  GalileoThemeService,
} from '@nicolalopatriello/galileo';
import {MarkdownModule} from 'ngx-markdown';
import {GalileoThemeInterface} from '@nicolalopatriello/galileo';


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

