import {Component, OnInit} from '@angular/core';
import {SidebarItem} from '../../../../../galileo/src/lib/components/galileo-sidebar/sidebar-item';
import {of} from 'rxjs';
import {
  NavBarUserMenuItem,
  UserMenuItemType
} from '../../../../../galileo/src/lib/components/galileo-nav-bar/nav-bar/nav-bar-user-menu-item';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {buildGalileoBreadCrumb} from '../../../../../galileo/src/lib/utils/build-galileo-breadcrumb';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styles: []
})
export class DashboardContainerComponent implements OnInit {

  public sidebarItemsGroups: Map<string, SidebarItem[]> = new Map<string, SidebarItem[]>();
  userMenuItems: NavBarUserMenuItem[] = [{id: 'logout', label: 'Logout', type: UserMenuItemType.ITEM}];
  sidebarOpened = true;
  breadcrumbs: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sidebarItemsGroups.set('Galileo', [
      {id: 'tables', label: 'Tables', show: of(true), routerLink: 'tables', faIcon: 'table'},
      {id: 'cards', label: 'Cards', show: of(true), routerLink: 'cards', faIcon: 'address-card'},
      {id: 'auth-layouts', label: 'Auth layout', show: of(true), routerLink: 'auth-layout', faIcon: 'layer-group'},
      {id: 'dashboard-layouts', label: 'Dashboard layout', show: of(true), routerLink: 'dashboard-layout', faIcon: 'layer-group'},
      {id: 'forms', label: 'Forms', show: of(true), routerLink: 'forms', faIcon: 'align-justify'},
      {id: 'theming', label: 'Theming', show: of(true), routerLink: 'theming', faIcon: 'fill-drip'}
    ])

    this.breadcrumbs = buildGalileoBreadCrumb(this.activatedRoute.root);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = buildGalileoBreadCrumb(this.activatedRoute.root);
    });

  }

  onToggleSidebar($event: boolean) {
    this.sidebarOpened = !this.sidebarOpened;
  }

  omSidebarItemClick($event: SidebarItem) {

  }

  onUserMenuItemClick($event: NavBarUserMenuItem) {

  }
}
