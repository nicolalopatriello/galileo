import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { noop } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {SidebarItem} from '../sidebar-item';

@Component({
  selector: 'gll-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `

    <div class="h-100 d-flex flex-column sidenav">
      <div class="d-flex align-items-end flex-column h-100 w-100">
        <ng-container *ngFor="let groupLabel of getKeys(sidebarItemsGroups)">
          <!-- //TODO evaluate to use it -->
          <!--  <p *ngIf="groupLabel?.length > 0" class="small d-flex w-100 p-0 m-0">{{groupLabel}}</p>-->
          <ng-container *ngFor="let item of getValueOf(groupLabel)" class="mt-2">
            <ng-container *ngIf="item.show | async">
              <div
                [routerLink]="'/'+item.routerLink" routerLinkActive="sidenav__item-active"
                #rla="routerLinkActive"
                (click)="onClickAction(item, groupLabel)" class="d-flex flex-row cursor-pointer sidenav__item
              pl-3 w-100 "
                [ngClass]="{'sidenav--closed': !sideBarOpened, 'sidenav__item__group-border': belongToGroup(item.label)}">
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
  @Input() sidebarItemsGroups: Map<string, SidebarItem[]> = new Map<string, SidebarItem[]>();
  @Input() sideBarOpened: boolean;

  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentItemGroup: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  onClickAction(item: SidebarItem, groupLabel: string) {
    this.currentItemGroup = groupLabel;
    !item.disabled ? this.itemClick.emit(item) : noop();
  }

  getKeys(sidebarItemsGroups: Map<string, SidebarItem[]>) {
    return Array.from(sidebarItemsGroups.keys());
  }

  getValueOf(groupLabel: string) {
    return this.sidebarItemsGroups.get(groupLabel);
  }

  belongToGroup(itemLabel: string) {
    return this.sidebarItemsGroups.get(this.currentItemGroup)?.find(t => t.label === itemLabel);
  }

  setActiveGroup(groupLabel: string) {
    this.currentItemGroup = groupLabel;
  }

  ngOnInit(): void {
    //   this.activatedRoute.
  }
}
