import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  template: `
    <div class="d-flex w-100 flex-row gll-filter">
      <div class="d-flex" [ngSwitch]="columnFilterConfig?.type">
        <input *ngSwitchCase="'gllTextColumnFilter'" [attr.data-cy]="columnField + '-filter-input'"
               (input)="filterValueChange()" [(ngModel)]="value" class="form-control-sm form-control">
        <div *ngSwitchCase="'gllSelectMenuColumnFilter'">
          <select (change)="selectMenuFilterChange($event.target.value)" [value]="null" class="form-control-sm">
            <option [value]="'NO_FILTER'">All</option>
            <option [value]="o" *ngFor="let o of columnFilterConfig?.selectMenuOptions">{{o}}</option>
          </select>
        </div>
        <div *ngSwitchCase="'gllDateColumnFilter'">
          gllDateColumnFilter to implement
        </div>
      </div>
      <div class="d-flex pt-1 pl-1" ngbDropdown placement="bottom-right"
           *ngIf="columnFilterConfig?.type === 'gllTextColumnFilter'">
        <fa-icon class="cursor-pointer"
                 [attr.data-cy]="columnField + '-filter-options'"
                 id="dropdownBasic2" ngbDropdownToggle [icon]="['fas', 'filter']">
        </fa-icon>
        <div ngbDropdownMenu class="p-2">
          <div>
            <select (change)="onFilterOptionChange($event)"
                    [attr.data-cy]="columnField + '-dropdown-filter'"
                    [(ngModel)]="selectedFilterOption" id="filtersOptions" class="w-100 form-control-sm form-control">
              <option [attr.data-cy]="columnField + '-' + o + '-dropdown-filter'" class="form-control"
                      *ngFor="let o of columnFilterConfig?.options" [value]="o">{{o | galileoTranslate}}</option>
            </select>
            <input (input)="filterValueChange()" [attr.data-cy]="columnField + '-dropdown-filter-input'"
                   [(ngModel)]="value" class="form-control-sm form-control mt-1">
            <input *ngIf="selectedFilterOption === 'inRange'" (input)="filterValueChange()"
                   [attr.data-cy]="columnField + '-dropdown-filter-input-valueTo'"
                   [(ngModel)]="valueTo" class="form-control-sm form-control mt-1">
          </div>
        </div>
      </div>
    </div>
  `,
  selector: 'gll-filters',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() columnField: string;
  @Input() columnFilterConfig: ColumnFilterConfig = {
    options: ['contains', 'startsWith'],
    type: 'gllTextColumnFilter'
  };

  @Output() columnFilterValue: EventEmitter<ColumnFilterEvent> = new EventEmitter<ColumnFilterEvent>();

  public value: string | number;
  public valueTo: string | number;
  public selectedFilterOption: columnFilterOptions = this.columnFilterConfig.options[0];

  constructor() {
  }

  ngOnInit(): void {
  }

  onFilterOptionChange($event: any) {
  }

  filterValueChange() {
    const e: ColumnFilterEvent = {
      type: this.selectedFilterOption,
      columnField: this.columnField,
      value: this.value,
      valueTo: this.valueTo
    };
    this.columnFilterValue.emit(e);
  }

  selectMenuFilterChange(value: any) {
    const e: ColumnFilterEvent = {
      type: 'equals',
      columnField: this.columnField,
      value: value,
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
  type: columnFilterOptions;
  columnField: string;
  value: string | number;
  valueTo?: string | number;
}
