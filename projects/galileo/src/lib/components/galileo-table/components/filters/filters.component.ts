import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  template: `
    <div class="d-flex w-100 flex-row gll-filter">
      <div class="d-flex" [ngSwitch]="columnFilterConfig?.type">
        <input *ngSwitchCase="'gllTextColumnFilter'" [attr.data-cy]="columnField + '-filter-input'"
               (input)="filterValueChange()" [(ngModel)]="value" class="form-control-sm form-control">
        <input *ngSwitchCase="'gllNumberColumnFilter'" [attr.data-cy]="columnField + '-filter-input'"
               (input)="filterValueChange()" type="number" [(ngModel)]="value" class="form-control-sm form-control">
        <div *ngSwitchCase="'gllSelectMenuColumnFilter'">
          <select (change)="selectMenuFilterChange($event.target.value)" [value]="null" class="form-control-sm">
            <option [value]="'NO_FILTER'">All</option>
            <option [value]="o" *ngFor="let o of columnFilterConfig?.selectMenuOptions">{{o}}</option>
          </select>
        </div>
        <div *ngSwitchCase="'gllDateColumnFilter'">
          <div class="d-flex flex-row">
            <div class="d-flex">
              <div class="d-flex flex-row justify-content-around bg-white"
                   style="border-radius: 5px; height: 31px; padding: 2px; width: 150px">
                <div class="d-flex flex-column justify-content-around w-100 px-1">
                  <div style="line-height: 1" class="text-dark small d-flex flex-row justify-content-between"
                       *ngIf="value">
                    <div class="d-flex" *ngIf="selectedFilterOption === 'inRange'">
                      {{'from' | galileoTranslate | async}}:
                    </div>
                    <div class="d-flex" *ngIf="selectedFilterOption === 'lessThanOrEqual'">
                      {{'before' | galileoTranslate | async}}:
                    </div>
                    <div class="d-flex" *ngIf="selectedFilterOption === 'greaterThanOrEqual'">
                      {{'after' | galileoTranslate | async}}:
                    </div>
                    <div class="d-flex" *ngIf="selectedFilterOption === 'equals'">
                      {{'dateEquals' | galileoTranslate | async}}:
                    </div>
                    <div class="d-flex"> {{value | date}}</div>
                  </div>
                  <div style="line-height: 1" class="text-dark small d-flex flex-row justify-content-between"
                       *ngIf="valueTo">
                    <div class="d-flex">
                      {{'to' | galileoTranslate | async}}:
                    </div>
                    <div class="d-flex"> {{valueTo | date}}</div>
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-around" *ngIf="value || valueTo">
                  <fa-icon class="cursor-pointer text-black-50" [icon]="['fas', 'trash-alt']"
                           (click)="clearDateFilter()"></fa-icon>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="d-flex pt-1 pl-1" ngbDropdown placement="bottom-right"
             *ngIf="columnFilterConfig?.type === 'gllTextColumnFilter'
           || columnFilterConfig?.type === 'gllNumberColumnFilter'">
          <fa-icon class="cursor-pointer"
                   [attr.data-cy]="columnField + '-filter-options'"
                   id="dropdownBasic2" ngbDropdownToggle [icon]="['fas', 'filter']">
          </fa-icon>

          <div ngbDropdownMenu class="p-2"
               *ngIf="columnFilterConfig?.type === 'gllTextColumnFilter' || columnFilterConfig?.type === 'gllNumberColumnFilter'">
            <div>
              <select (change)="onFilterOptionChange($event)"
                      [attr.data-cy]="columnField + '-dropdown-filter'"
                      [(ngModel)]="selectedFilterOption" id="filtersOptions" class="w-100 form-control-sm form-control">
                <option [attr.data-cy]="columnField + '-' + o + '-dropdown-filter'" class="form-control"
                        *ngFor="let o of columnFilterConfig?.options"
                        [value]="o">{{o | galileoTranslate | async}}</option>
              </select>
              <input (input)="filterValueChange()" [attr.data-cy]="columnField + '-dropdown-filter-input'"
                     [(ngModel)]="value" class="form-control-sm form-control mt-1">
              <input *ngIf="selectedFilterOption === 'inRange'" (input)="filterValueChange()"
                     [attr.data-cy]="columnField + '-dropdown-filter-input-valueTo'"
                     [(ngModel)]="valueTo" class="form-control-sm form-control mt-1">
            </div>
          </div>
        </div>

        <div class="d-flex pt-1 pl-1" ngbDropdown placement="bottom-right"
             *ngIf="columnFilterConfig?.type === 'gllDateColumnFilter'">
          <fa-icon class="cursor-pointer"
                   (click)="dialogService.open(calendarContainerDialog, {size: 'sm'})"
                   [attr.data-cy]="columnField + '-filter-options'"
                   [icon]="['fas', 'filter']">
          </fa-icon>
        </div>


        <ng-template #calendarContainerDialog>
          <gll-date-picker-filter (dateFilterValue)="onDateFilterValue($event)"
                                  [selectedFilterOption]="selectedFilterOption"
                                  [columnHeaderName]="columnHeaderName"
                                  [availableFilterOptions]="columnFilterConfig.options">
          </gll-date-picker-filter>
        </ng-template>
  `,
  selector: 'gll-filters',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() columnField: string;
  @Input() columnHeaderName: string;
  @Input() columnFilterConfig: ColumnFilterConfig;

  @Output() columnFilterValue: EventEmitter<ColumnFilterEvent> = new EventEmitter<ColumnFilterEvent>();


  public value: string | number;
  public valueTo: string | number;
  public selectedFilterOption: columnFilterOptions = null;

  constructor(public dialogService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.columnFilterConfig?.options.length) {
      this.selectedFilterOption = this.columnFilterConfig.options[0]
    }
  }

  onFilterOptionChange($event: any) {
  }

  filterValueChange() {
    const e: ColumnFilterEvent = {
      filterType: this.columnFilterConfig.type,
      filterOption: this.selectedFilterOption,
      columnField: this.columnField,
      value: this.value,
      valueTo: this.valueTo
    };
    this.columnFilterValue.emit(e);
  }

  selectMenuFilterChange(value: any) {
    const e: ColumnFilterEvent = {
      filterType: this.columnFilterConfig.type,
      filterOption: 'equals',
      columnField: this.columnField,
      value: value,
      valueTo: null
    };
    this.columnFilterValue.emit(e);
  }

  onDateFilterValue($event: { filterOptions: columnFilterOptions; from: number | null; to: number | null }) {
    this.selectedFilterOption = $event.filterOptions;
    this.value = $event.from;
    this.valueTo = $event.to;
    const e: ColumnFilterEvent = {
      filterType: this.columnFilterConfig.type,
      filterOption: this.selectedFilterOption,
      columnField: this.columnField,
      value: $event.from,
      valueTo: $event.to
    };
    this.columnFilterValue.emit(e);
  }

  clearDateFilter() {
    this.value = null;
    this.valueTo = null;
    const e: ColumnFilterEvent = {
      filterType: this.columnFilterConfig.type,
      filterOption: this.selectedFilterOption,
      columnField: this.columnField,
      value: 'NO_FILTER',
      valueTo: null
    };
    this.columnFilterValue.emit(e);
  }
}

export interface ColumnFilterConfig {
  type: columnFilterType,
  selectMenuOptions?: string[],
  options: columnFilterOptions[],
}

export type columnFilterType =
  'gllTextColumnFilter'
  | 'gllNumberColumnFilter'
  | 'gllDateColumnFilter'
  | 'gllSelectMenuColumnFilter'

export type columnFilterOptions = 'equals' | 'notEqual' | 'lessThanOrEqual'
  | 'greaterThanOrEqual' | 'inRange' | 'contains' | 'startsWith';

export interface ColumnFilterEvent {
  filterOption: columnFilterOptions;
  filterType: columnFilterType;
  columnField: string;
  value: string | number;
  valueTo?: string | number;
}
