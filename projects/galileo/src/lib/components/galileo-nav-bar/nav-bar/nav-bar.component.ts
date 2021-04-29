import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavBarUserMenuItem, UserMenuItemType} from './nav-bar-user-menu-item';
import {Observable} from "rxjs";
import {Utils} from "../../../utils/utils";

@Component({
  selector: 'gll-nav-bar',
  template: `
    <nav [ngStyle]="{'height': navbarHeightPx+'px'}"
         [ngClass]="{'fixed-top': fixedTop}"
         class="navbar gll-navbar justify-content-end">
      <ng-content></ng-content>
      <div class="nav-item dropdown">
        <a data-toggle="dropdown">
          <div data-cy="user-menu" class="gll-avatar cursor-pointer dropdown-toggle">
            <img [src]="avatarImageSrc">
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-right gll-user-menu"
             style="border-radius: 10px; width: 200px; z-index: 9000">
          <div class="d-flex flex-column justify-content-center pt-4 pr-4 pl-4" *ngIf="loggedUsername">
            <div class="w-100">
              <div class="gll-avatar cursor-pointer d-flex mr-auto ml-auto" style="width: 45px; height: 45px">
                <img [src]="avatarImageSrc">
              </div>
            </div>
            <div class="d-flex text-black-50 mr-auto ml-auto mt-2">
              <p class="font-weight-bold">{{loggedUsername}}</p>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <ng-container *ngFor="let item of userMenuItems">
            <div class="dropdown-divider" *ngIf="item.type == UserMenuItemType.SEPARATOR"></div>
            <button *ngIf="item.type === UserMenuItemType.ITEM"
                    class="dropdown-item btn btn-sm font-12 pt-2 pb-2"
                    type="button" [disabled]="item.disabled"
                    (click)="!item.disabled ? userMenuItemClick.emit(item): null">
              <i style="font-size: 20px; vertical-align: bottom" [ngStyle]="{'color': item.faIcon?.color}" class="material-icons-outlined mr-1">{{item.faIcon?.icon}}
              </i>
              {{isObs(item.label) ? (item.label | async) : item.label}}
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
  @Input() loggedUsername: string = null;
  @Input() avatarImageSrc: string;
  @Input() fixedTop = true;

  UserMenuItemType = UserMenuItemType;

  isObs(label: string | Observable<string>) {
    return Utils.isObs<string>(label);
  }
}
