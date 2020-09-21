import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NavBarUserMenuItem, UserMenuItemType} from './nav-bar-user-menu-item';

@Component({
  selector: 'gll-nav-bar',
  template: `
    <nav [ngStyle]="{'height': navbarHeightPx+'px'}"
         [ngClass]="{'fixed-top': fixedTop}"
         class="navbar gll-navbar bg-lsi justify-content-end">
      <ng-content></ng-content>
      <div class="nav-item dropdown">
        <a data-toggle="dropdown">
          <div data-cy="user-menu"  class="gll-avatar cursor-pointer dropdown-toggle">
            <img [src]="avatarImageSrc">
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-right gll-user-menu">
          <ng-container *ngFor="let item of userMenuItems">
            <div class="dropdown-divider" *ngIf="item.type == UserMenuItemType.SEPARATOR"></div>
            <button *ngIf="item.type === UserMenuItemType.ITEM"
                    class="dropdown-item btn btn-sm font-12 pt-1 pb-1"
                    type="button" [disabled]="item.disabled"
                    (click)="!item.disabled ? userMenuItemClick.emit(item): null">
              <fa-icon class="mr-1" [ngStyle]="{'color': item.faIcon.color}"
                       *ngIf="item.faIcon" [icon]="['fas', item.faIcon.icon]" size="1x"></fa-icon>
              {{item.label}}
            </button>

          </ng-container>
        </div>
      </div>

    </nav>
  `,
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() userMenuItemClick = new EventEmitter<NavBarUserMenuItem>();

  @Input() navbarHeightPx: number;
  @Input() userMenuItems: NavBarUserMenuItem[];
  @Input() avatarImageSrc: string;
  @Input() fixedTop = true;

  UserMenuItemType = UserMenuItemType;
}
