import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DlSidebarDirective} from '../dl-sidebar.directive';
import {DlNavbarDirective} from '../dl-navbar.directive';
import {GllBreadCrumb} from '../breadcrumb/gll-breadcrumb';

@Component({
    selector: 'gll-dashboard-layout',
    styleUrls: ['./dashboard-layout.component.scss'],
    templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {

    @ContentChild(DlSidebarDirective, {read: TemplateRef}) dlSidebarTemplate;
    @ContentChild(DlNavbarDirective, {read: TemplateRef}) dlNavbarTemplate;

    @Input() sideBarOpened = false;
    @Input() dockSizePx = 50;
    @Input() navbarHeightPx = 70;
    @Input() hideSidebar = false;

    @Input() breadcrumbs: GllBreadCrumb[] = null;

    @Input() brandSrc: string;
    @Input() closedSidebarBrandSrc: string;

    @Output() toggleSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();


    public toggleOpened(): void {
        this.toggleSideBar.emit(!this.sideBarOpened);
    }

    constructor(private sanitizer: DomSanitizer) {
    }

    getSideNavHeight() {
        return this.sanitizer.bypassSecurityTrustStyle('calc(100% - ' + this.navbarHeightPx * 2 + 'px');
    }

    getDashboardContentHeight() {
        if (this.dlNavbarTemplate) {
            return this.sanitizer.bypassSecurityTrustStyle('calc(100vh - ' + this.navbarHeightPx + 'px');
        } else {
            return this.sanitizer.bypassSecurityTrustStyle('100vh');
        }
    }

}
