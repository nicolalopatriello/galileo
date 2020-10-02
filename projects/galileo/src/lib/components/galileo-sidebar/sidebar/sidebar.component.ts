import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {noop} from 'rxjs';
import {SidebarItem} from '../sidebar-item';
import {SidebarGroup} from '../sidebar-group';

@Component({
  selector: 'gll-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `

    <div class="h-100 d-flex flex-column sidenav">
      <div class="d-flex align-items-end flex-column h-100 w-100">
        <ng-container *ngFor="let groupLabel of getKeys(sidebarItemsGroups); let i = index">
          <p *ngIf="sidebarItemsGroups.get(groupLabel)?.groupLabel"
            [ngStyle]="{background: sidebarItemsGroups.get(groupLabel).groupLabel.background, color: sidebarItemsGroups.get(groupLabel).groupLabel.color}"
            class="small d-flex w-100 p-1 m-0 justify-content-center font-weight-bolder" [ngClass]="{'mt-1' : i > 0}">{{sidebarItemsGroups.get(groupLabel).groupLabel.label}}</p>

          <div class="w-100" style="height: 3px" [ngStyle]="{background: sidebarItemsGroups.get(groupLabel).groupLabel.background}" *ngIf="!sideBarOpened && sidebarItemsGroups.get(groupLabel).groupLabel"></div>
          <ng-container *ngFor="let item of getValueOf(groupLabel)" class="mt-2">
            <ng-container *ngIf="item.show | async">
              <div
                [routerLink]="'/'+item.routerLink" routerLinkActive="sidenav__item-active"
                #rla="routerLinkActive"
                (click)="onClickAction(item, groupLabel, sidebarItemsGroups.get(groupLabel).groupLabel.background)" class="d-flex flex-row cursor-pointer sidenav__item
              pl-3 w-100 "
                [ngStyle]="{'border-left': belongToGroup(item.label) && sidebarItemsGroups.get(groupLabel)?.groupLabel ? '5px solid ' + sidebarItemsGroups.get(groupLabel).groupLabel.activeItemGroupBorderColor : null}"
                [ngClass]="{'sidenav--closed': !sideBarOpened}">
                <fa-icon
                  [icon]="['fas', item.faIcon]"
                  class="fa-1x" [ngClass]="{'item-icon': !rla.isActive,
                              'item-icon-active': rla.isActive}"></fa-icon>
                <div [ngClass]="{'pl-2': sideBarOpened}" class="d-flex justify-content-center"
                     *ngIf="sideBarOpened">
                  <div class="d-flex align-self-center sidenav__label"
                       [ngClass]="{'sidenav__label-active': rla.isActive}">{{item.label}}</div>
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

  @Output() itemClick = new EventEmitter<{ item: SidebarItem, groupLabel: string, groupColor: string }>();
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentItemGroup: string;

  constructor() {
  }

  onClickAction(item: SidebarItem, groupLabel: string, groupColor: string): void {
    this.currentItemGroup = groupLabel;
    !item.disabled ? this.itemClick.emit({item, groupLabel, groupColor}) : noop();
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

  setActiveGroup(groupLabel: string): void {
    this.currentItemGroup = groupLabel;
  }

  ngOnInit(): void {
    this.currentItemGroup = Array.from(this.sidebarItemsGroups.keys())[0];
  }

  showLabel(groupLabel: string): boolean {
    return this.sidebarItemsGroups.get(groupLabel).groupLabel?.show;
  }

  getLabel(groupLabel: string): string {
    return this.sidebarItemsGroups.get(groupLabel).groupLabel?.label;
  }
}
