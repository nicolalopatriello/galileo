import {Component} from '@angular/core';
import {GalileoThemeService} from 'galileo';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styles: []
})
export class ThemingComponent {


  constructor(private galileoThemeService: GalileoThemeService) {
  }

  markDown = `
  \`Galileo\` supports real-time theme switcher. Mechanism is based on CSS variables and available variables are declared inside \`GalileoThemeInterface\`

\`\`\`css
  export interface GalileoThemeInterface {
  '--gll-dashboard-content-bg'?: string;
  '--gll-breadcrumb-bg'?: string;
  '--gll-breadcrumb-label-color'?: string;
  '--gll-breadcrumb-label-color-hover'?: string;
  '--gll-breadcrumb-box-shadow'?: string;

  '--gll-hover-transition-effect'?: string;

  '--gll-sidenav-width'?: string;
  '--gll-sidenav-item-separator-height'?: string;
  '--gll-sidnav-item-bg'?: string;
  '--gll-sidenav-background'?: string;
  '--gll-sidenav-item-active-bg'?: string;
  '--gll-sidenav-item-active-color'?: string;
  '--gll-sidenav-item-bg-hover'?: string;
  '--gll-sidenav-item-label-color'?: string;
  '--gll-sidenav-item-pt'?: string;
  '--gll-sidenav-item-pb'?: string;
  '--gll-sidenav-item-group-border-color'?: string;
  '--gll-sidenav-item-group-border-width'?: string;
  '--gll-sidenav-brand-bg'?: string;
  '--gll-sidenav-toggler-bg'?: string;
  '--gll-sidenav-toggler-bg-hover'?: string;
  '--gll-sidenav-toggler-color'?: string;
  '--gll-auth-layout--only-form-bg'?: string;
  '--gll-sign-in-form-box-shadow'?: string;

  '--gll-navbar-bg'?: string;
  '--gll-navbar-border-bottom'?: string;
  '--gll-navbar-usermenu-item-bg'?: string;

  '--gll-simple-card-title-fs'?: string;
  '--gll-simple-card-subtitle-fs'?: string;
  '--gll-simple-card-bg'?: string;
  '--gll-simple-card-color'?: string;

  '--gll-table-header-bg'?: string;
  '--gll-table-filters-row-bg'?: string;
  '--gll-table-row-bg'?: string
  '--gll-table-row-bg-hover'?: string;
  '--gll-table-border'?: string;
  '--gll-table-bg'?: string
}
\`\`\`

To use it just:

* Create some custom themes

\`\`\`typescript
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
\`\`\`

* Registers theme when \`GalileoModule\` is imported

\`\`\`typescript
    GalileoModule.forRoot({
      themesToRegister: [
        {name: 'galileoCustomTheme', theme: galileoCustomTheme},
        {name: 'themeWithDarkSidebar', theme: themeWithDarkSidebar},
        {name: 'themeWithDarkBreadcrumbs', theme: themeWithDarkBreadcrumbs},
      ]
    }),
\`\`\`

* Switch themes with \`GalileoThemeService.setTheme()\` method

\`\`\`typescript
    this.galileoThemeService.setTheme('themeWithDarkBreadcrumbs');
\`\`\`
  `;


  darkSidebar() {
    this.galileoThemeService.setTheme('themeWithDarkSidebar');
  }

  darkBreadcrumbs() {
    this.galileoThemeService.setTheme('themeWithDarkBreadcrumbs');
  }


}
