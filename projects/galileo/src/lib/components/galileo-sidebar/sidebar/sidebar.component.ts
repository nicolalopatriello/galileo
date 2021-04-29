import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {noop, Observable} from 'rxjs';
import {SidebarItem} from '../sidebar-item';
import {SidebarGroup} from '../sidebar-group';
import {Utils} from '../../../utils/utils';

@Component({
  selector: 'gll-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <div class="h-100 d-flex flex-column sidenav">
      <div class="d-flex align-items-end flex-column h-100 w-100">
        <ng-container *ngFor="let groupLabel of getKeys(sidebarItemsGroups); let i = index">
          <p
            *ngIf="sideBarOpened && sidebarItemsGroups.get(groupLabel)?.groupLabel && (sidebarItemsGroups.get(groupLabel).groupLabel.show | async)"
            [ngStyle]="{background: (sidebarItemsGroups.get(groupLabel).groupLabel.background | async), color: (sidebarItemsGroups.get(groupLabel).groupLabel.color | async)}"
            class="small d-flex w-100 p-1 m-0 justify-content-center font-weight-bolder"
            [id]="'groupLabelId_' + i"
            [ngClass]="{'mt-1' : i > 0}">{{sidebarItemsGroups.get(groupLabel).groupLabel.label | async}}
          </p>

          <div class="w-100" style="height: 3px"
               [ngStyle]="{background: (sidebarItemsGroups.get(groupLabel).groupLabel.background | async)}"
               *ngIf="!sideBarOpened &&
               sidebarItemsGroups.get(groupLabel).groupLabel && (sidebarItemsGroups.get(groupLabel).groupLabel.show | async)">
          </div>
          <ng-container *ngFor="let item of getValueOf(groupLabel)" class="mt-2">
            <ng-container *ngIf="item.show | async">
              <div
                [id]="'sidebarElementId_' + item.id"
                [routerLink]="'/'+item.routerLink" routerLinkActive="sidenav__item-active"
                #rla="routerLinkActive"
                (click)="onClickAction(item, groupLabel)" class="d-flex flex-row cursor-pointer sidenav__item
              pl-3 pr-3 w-100 "
                [ngStyle]="{'border-left': belongToGroup(isObs(item.label) ? (item.label | async) : item.label) &&
                sidebarItemsGroups.get(groupLabel)?.groupLabel &&
                (sidebarItemsGroups.get(groupLabel).groupLabel.show | async) ? '5px solid ' + (sidebarItemsGroups.get(groupLabel).groupLabel.activeItemGroupBorderColor | async) : null}"
                [ngClass]="{'sidenav--closed': !sideBarOpened}">
                <span *ngIf="item.faIcon" [ngClass]="{'item-icon': !rla.isActive,
                              'item-icon-active': rla.isActive}" class="material-icons-outlined">{{item.faIcon}}</span>
                <img *ngIf="item.svgPath" [src]="item.svgPath" style="width: 20px">
                <div [ngClass]="{'pl-2': sideBarOpened}" class="d-flex justify-content-center"
                     *ngIf="sideBarOpened">
                  <div class="d-flex align-self-center sidenav__label"
                       [ngClass]="{'sidenav__label-active': rla.isActive}">{{isObs(item.label) ? (item.label | async) : item.label}}</div>
                </div>
              </div>
              <div class="d-flex sidenav__separator"></div>
            </ng-container>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `
})
export class SidebarComponent implements OnInit {
  @Input() sidebarItemsGroups: Map<string, SidebarGroup> = new Map<string, SidebarGroup>();
  @Input() sideBarOpened: boolean;

  @Output() itemClick = new EventEmitter<{ item: SidebarItem, groupLabel: string }>();
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  private currentItemGroup: string;

  onClickAction(item: SidebarItem, groupLabel: string): void {
    this.currentItemGroup = groupLabel;
    !item.disabled ? this.itemClick.emit({item, groupLabel}) : noop();
  }

  getKeys(sidebarItemsGroups: Map<string, SidebarGroup>): string[] {
    return Array.from(sidebarItemsGroups.keys());
  }

  getValueOf(groupLabel: string): SidebarItem[] {
    return this.sidebarItemsGroups.get(groupLabel).items;
  }

  belongToGroup(itemLabel: string): SidebarItem {
    return this.sidebarItemsGroups.get(this.currentItemGroup).items.find(t => t.label === itemLabel);
  }


  ngOnInit(): void {
    this.currentItemGroup = Array.from(this.sidebarItemsGroups.keys())[0];
  }

  isObs(label: string | Observable<string>) {
    return Utils.isObs<string>(label);
  }
}
