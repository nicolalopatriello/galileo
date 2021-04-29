import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {SidebarItem} from '../../../../../galileo/src/lib/components/galileo-sidebar/sidebar-item';
import {of} from 'rxjs';
import {
  NavBarUserMenuItem,
  UserMenuItemType
} from '../../../../../galileo/src/lib/components/galileo-nav-bar/nav-bar/nav-bar-user-menu-item';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {buildGalileoBreadCrumb} from '../../../../../galileo/src/lib/utils/build-galileo-breadcrumb';
import {SidebarGroup} from '../../../../../galileo/src/lib/components/galileo-sidebar/sidebar-group';
import {GalileoLanguageService, UserOnBoardingService} from '../../../../../galileo/src/lib/services';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar', {read: ElementRef}) sidebar: ElementRef<any>;


  @ViewChild('explanation', {static: true}) explanation: TemplateRef<any>;

  public sidebarItemsGroups: Map<string, SidebarGroup> = new Map<string, SidebarGroup>();
  userMenuItems: NavBarUserMenuItem[] = [{
    id: 'logout', label: 'Logout', type: UserMenuItemType.ITEM, faIcon: {
      icon: 'person',
      color: 'grey'
    }
  }];
  sidebarOpened = true;
  breadcrumbs: any;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private renderer2: Renderer2,
              private elementRef: ElementRef,
              public userOnBoardingService: UserOnBoardingService,
              private galileoLanguageService: GalileoLanguageService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.sidebarItemsGroups.set('Galileo', {
        items: [
          {id: 'home', label: 'Go to home', show: of(true), routerLink: null, faIcon: 'home'},
          {id: 'tables', label: 'Tables', show: of(true), routerLink: 'tables', faIcon: 'table_view'},
          {id: 'cards', label: 'Cards', show: of(true), routerLink: 'cards', faIcon: 'dashboard'},
          {id: 'auth-layouts', label: 'Auth layout', show: of(true), routerLink: 'auth-layout', faIcon: 'layers'},
          {
            id: 'dashboard-layouts',
            label: 'Dashboard layout',
            show: of(true),
            routerLink: 'dashboard-layout',
            faIcon: 'layers'
          },
          {id: 'forms', label: 'Forms', show: of(true), routerLink: 'forms', faIcon: 'list_alt'},
          {id: 'theming', label: 'Theming', show: of(true), routerLink: 'theming', faIcon: 'dark_mode'},
          {
            id: 'user-onboarding',
            label: 'User onboarding',
            show: of(true),
            routerLink: 'user-onboarding',
            svgPath: './assets/images/logs.svg'
          },
          {id: 'dialogs', label: 'Dialogs', routerLink: 'dialogs', faIcon: 'web_asset', show: of(true)}
        ],
        groupLabel: {
          label: of('Galileo'),
          show: of(true),
          activeItemGroupBorderColor: of('red'),
          color: of('white'),
          background: of('red')
        }
      }
    ).set('tools', {
      items: [{
        id: 'settings',
        label: 'Settings',
        routerLink: 'settings',
        faIcon: 'settings',
        show: of(true)
      },
      ],
      groupLabel: {
        background: of('blue'),
        color: of('white'),
        label: of('Tools'),
        show: of(true),
        activeItemGroupBorderColor: of('blue')
      }
    });

    this.breadcrumbs = buildGalileoBreadCrumb(this.activatedRoute.root);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = buildGalileoBreadCrumb(this.activatedRoute.root);
    });

  }

  onToggleSidebar($event: boolean): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  omSidebarItemClick($event: { item: SidebarItem; groupLabel: string; groupColor: string }): void {
    console.log('click to ' + JSON.stringify($event));
  }


  languageChanged($event: any) {
    this.galileoLanguageService.setLanguage($event.target.value);
  }
}
