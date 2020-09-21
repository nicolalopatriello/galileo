import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-layouts',
  templateUrl: './dashboard-layouts.component.html',
  styles: []
})
export class DashboardLayoutsComponent {

  constructor(private router: Router) {
  }

  markDown = `
\`DashboardLayout\` allow us to create a layout for our application.

\`\`\`markup
<div style="height: 100vh">
  <gll-dashboard-layout
    [dockSizePx]="50"
    [navbarHeightPx]="50"
    [breadcrumbs]="breadcrumbs"
    [sideBarOpened]="sidebarOpened"
    [brandSrc]="'../assets/images/galileo_logo.png'"
    (toggleSideBar)="onToggleSidebar($event)">
    <div *gllDlSidebar="let sideBarOpened">
      <gll-sidebar
        [sideBarOpened]="sideBarOpened"
        [sidebarItemsGroups]="sidebarItemsGroups"
        (itemClick)="omSidebarItemClick($event)">
      </gll-sidebar>
    </div>
    <div class="h-100" *gllDlNavbar>
      <gll-nav-bar class="h-100"
                   [navbarHeightPx]="50"
                   [fixedTop]="false"
                   [userMenuItems]="userMenuItems"
                   [avatarImageSrc]="'../assets/images/avatar.png'"
                   (userMenuItemClick)="onUserMenuItemClick($event)">
      </gll-nav-bar>
    </div>
  </gll-dashboard-layout>
</div>

\`\`\`

It supports 3 main features:

* \`gll-sidebar\` handled by \`gllDlSidebar\` directive
* \`gll-nav-bar\` handled by \`gllDlNavbar\` directive
* \`breadcrumbs\`.


## gll-sidebar
Main input argument is \`sidebarItemsGroups\`, is an object that allow us to build our menu.


\`\`\`typescript
    this.sidebarItemsGroups.set('Galileo', [
      {id: 'tables', label: 'Tables', show: of(true), routerLink: 'tables', faIcon: 'table'},
      {id: 'cards', label: 'Cards', show: of(true), routerLink: 'cards', faIcon: 'address-card'},
      {id: 'auth-layouts', label: 'Auth layout', show: of(true), routerLink: 'auth-layout', faIcon: 'layer-group'},
      {id: 'dashboard-layouts', label: 'Dashboard layout', show: of(true), routerLink: 'dashboard-layout', faIcon: 'layer-group'}
      ...
    ])
\`\`\`


## gll-nav-bar
Main input argument is \`userMenuItems\`, is an object that allow us to build our top navigation menu.

\`\`\`typescript
  userMenuItems: NavBarUserMenuItem[] = [{id: 'logout', label: 'Logout', type: UserMenuItemType.ITEM}];
\`\`\`

## Breadcrumbs
If provided, \`breadcrumbs\` allow us to have a Breadcrumb just bottom navbar.

To configure breadcrumb:
* Inside component that use \`<gll-dashboard-layout>\`

  \`\`\`typescript
    ngOnInit(): void {
    this.breadcrumbs = buildGalileoBreadCrumb(this.activatedRoute.root);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = buildGalileoBreadCrumb(this.activatedRoute.root);
    });
  }
\`\`\`
* In each route definition, use \`breadcrumb\` data to show static string
  \`\`\`typescript
      {
        path: 'dashboard-layout',
        loadChildren: () => import('./features/dashboard-layouts/dashboard-layouts.module').then(t => t.DashboardLayoutsModule),
        data: {
          breadcrumb: 'Dashboard layout'
        },
      }
\`\`\`
  If breadcrumb string value comes from rest api response, a solution can be to use \`breadcrumbResolveKey\`

    \`\`\`typescript
        resolve: {
          device: DeviceResolve
        },
       data: {
          breadcrumb: '', <-- this is empty
          breadcrumbResolveKey: 'device.serial'
        },
\`\`\`
   where \`DeviceResolve\` is an  [Angular Resolve](https://angular.io/api/router/Resolve)
    \`\`\`typescript
@Injectable({
  providedIn: 'root'
})
export class DeviceResolve implements Resolve<DeviceDetailsResponse> {

  constructor(private devicesService: DevicesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeviceDetailsResponse> | Promise<DeviceDetailsResponse> | DeviceDetailsResponse {
    return this.devicesService.getDeviceById(route.paramMap.get('deviceSerial'));
  }
}
\`\`\`
  `;

}
