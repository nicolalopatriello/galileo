import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ColumnFilterConfig, ColumnFilterEvent, columnFilterOptions, columnFilterType} from './components/filters';
import {FontAwesomeIconColorBoolPair, GalileoHelpMessage} from '../../models';
import {TableCellDirective} from './table-cell.directive';
import {FilterParser} from './utils/filter-parser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../utils/utils';
import {GalileoLanguageService} from '../../services';
import {debounceTime, map, take, takeUntil} from 'rxjs/operators';
import {ColumnSortEvent} from './components';

@Component({
  selector: 'gll-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterContentChecked, OnDestroy {
  @ViewChild('deleteRowDialog', {static: true}) deleteRowDialog: TemplateRef<any>;
  @ContentChild(TableCellDirective, {read: TemplateRef}) tableCellTemplate;


  @Input() tableConfig: TableConfig;
  @Input() data: any[] = [];
  @Input() loadingData = false;

  @Output() deleteConfirm: EventEmitter<any> = new EventEmitter();
  @Output() tableFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() tableSort: EventEmitter<any> = new EventEmitter<any>();
  @Output() extraAction: EventEmitter<{ eventKey: string, data: any }> = new EventEmitter<{ eventKey: string, data: any }>();
  @Output() checkboxRendererEvent: EventEmitter<{ checked: boolean, data: any, field: string }> = new EventEmitter<{ checked: boolean, data: any, field: string }>();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

  public currentRowToDelete: null;

  private currentFilters: Map<string, ColumnFilterEvent> = new Map<string, ColumnFilterEvent>();
  private currentSorts: Map<string, ColumnSortEvent> = new Map<string, ColumnSortEvent>();

  private filtersSubject: Subject<Map<string, ColumnFilterEvent>> = new Subject<Map<string, ColumnFilterEvent>>();
  private sortsSubject: Subject<Map<string, ColumnSortEvent>> = new Subject<Map<string, ColumnSortEvent>>();

  private tableFilterSubject: Subject<any> = new Subject<any>();
  private tableSortsSubject: Subject<any> = new Subject<any>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public clientSideInformation: ClientSideInformation = {
    inputData: [],
    pagination: {
      pageSize: 5, // default page size
      currentPage: 0,
      buckets: []
    }
  };
  public showDeleteConfirmInput = false;
  public deleteConfirmInputValue: string;
  public tableId: string;
  private readonly defaultFilterDebounceTime = 500;


  constructor(private dialogService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef,
              private galileoLanguageService: GalileoLanguageService) {
    this.tableId = 'gllTable' + Math.random().toString(12).substring(3, 6);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  showMenuBtn(tableContainerId: string, rowIdx: number): boolean {
    return document.querySelectorAll('#' + tableContainerId + '_gll-table-action_' + rowIdx).length > 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.data && !changes.data.isFirstChange() && this.tableConfig.mode === 'clientSide') {
      const b = this.clientSideInformation.pagination.buckets[this.clientSideInformation.pagination.currentPage];
      if (!!b) {
        this.data = this.clientSideInformation.inputData.slice(b.start, b.stop);
      }
    }
  }

  ngOnInit(): void {

    this.tableFilterSubject.pipe(
      debounceTime(this.defaultFilterDebounceTime),
      takeUntil(this.destroy$)
    ).subscribe(t => this.tableFilter.emit(t));

    this.tableSortsSubject.pipe(
      takeUntil(this.destroy$)
    ).subscribe(t => this.tableSort.emit(t));

    if (this.tableConfig.mode === 'clientSide') {
      this.clientSideInformation = {
        ...this.clientSideInformation,
        inputData: this.data,
        pagination: {
          ...this.clientSideInformation.pagination,
          buckets: this.buildBuckets(this.data?.length, this.clientSideInformation.pagination.pageSize)
        }
      };
      const b = this.clientSideInformation.pagination.buckets[0];
      if (!!b) {
        this.data = this.clientSideInformation.inputData?.slice(b.start, b.stop);
      }
    }

    this.filtersSubject.pipe(
    ).subscribe(t => {
      const parsed = this.parseFilter(t);
      switch (this.tableConfig.mode) {
        case 'clientSide':
          this.handleClientSideFilter(t);
          break;
        case 'serverSide':
          this.tableFilterSubject.next(parsed);
          break;
      }
    });

    this.sortsSubject.pipe(
    ).subscribe(t => {
      const parsed = this.parseSorts(t);
      switch (this.tableConfig.mode) {
        case 'clientSide':
          throw Error('Not implemented');
        case 'serverSide':
          this.tableSortsSubject.next(parsed);
          break;
      }
    });

  }


  atLeastOneFilter() {
    return this.tableConfig.columnsDef?.filter(t => !!t.filterConfig).length > 0;
  }

  atLeastOneAction(row: any = null) {
    return this.tableConfig?.actions?.delete?.show || this.tableConfig?.extraActions?.length > 0;
  }

  onDelete(r: any) {
    if (this.tableConfig.actions.delete.builtIn && !this.tableConfig.actions.delete.disabled(r)) {
      this.showDeleteConfirmInput = this.tableConfig.actions.delete.showDeleteConfirmInput;
      this.currentRowToDelete = r;
      this.dialogService.open(this.deleteRowDialog, {size: 'sm', backdrop: 'static', centered: true});
    }
  }

  confirmDelete() {
    this.deleteConfirm.emit(this.currentRowToDelete);
    this.dialogService.dismissAll();
  }

  cancelDelete() {
    this.deleteConfirmInputValue = null;
    this.currentRowToDelete = null;
    this.dialogService.dismissAll();
  }

  onColumnFilterValue($event: ColumnFilterEvent) {
    /*
    NO_FILTER is a value from @filters.component
    if 'gllSelectMenuColumnFilter' have All option set
    * */
    if ($event.value === 'NO_FILTER') {
      this.currentFilters.delete($event.columnField);
    } else {
      this.currentFilters.set($event.columnField, $event);
    }
    this.filtersSubject.next(this.currentFilters);
  }

  onColumnSort($event: ColumnSortEvent) {
    if ($event.value === null) {
      this.currentSorts.delete($event.columnField);
    } else {
      this.currentSorts.set($event.columnField, $event);
    }
    this.sortsSubject.next(this.currentSorts);
  }

  private parseFilter(t: Map<string, ColumnFilterEvent>): any {
    return FilterParser.getHttpParams(this.tableConfig.tableFilterParser, t);
  }

  private parseSorts(t: Map<string, ColumnSortEvent>): Array<ColumnSortEvent> {
    const arr: Array<ColumnSortEvent> = [];
    Array.from(t.keys()).forEach(k => {
      arr.push({columnField: k, value: t.get(k).value});
    });
    return arr;
  }

  private handleClientSideFilter(filters: Map<string, ColumnFilterEvent>) {
    let filteredData = this.clientSideInformation?.inputData;
    const keys = Array.from(filters.keys());
    keys.forEach(t => {
      filteredData = filteredData?.filter(dataRow => this.applyOperator(dataRow[t], filters.get(t).filterOption, filters.get(t).filterType, filters.get(t).value));
    });
    const b = this.clientSideInformation.pagination.buckets[0];
    this.data = filteredData.slice(!!b ? b.start : 0, !!b ? b.stop : this.clientSideInformation.pagination.pageSize);
    this.clientSideInformation = {
      ...this.clientSideInformation,
      pagination: {
        ...this.clientSideInformation.pagination,
        currentPage: 0,
        buckets: this.buildBuckets(filteredData.length, this.clientSideInformation.pagination.pageSize)
      }
    };

  }

  private applyOperator(stringToFilter: string, filterOption: columnFilterOptions, filterType: columnFilterType, value: string | number) {
    if (stringToFilter?.toString()?.length) {
      switch (filterOption) {
        case 'greaterThanOrEqual':
          switch (filterType) {
            case 'gllNumberColumnFilter':
              return value > 0 ? Number.parseInt(stringToFilter) >= Number.parseInt(value?.toString()) : true;
          }
          break;
        case 'lessThanOrEqual':
          switch (filterType) {
            case 'gllNumberColumnFilter':
              return value > 0 ? Number.parseInt(stringToFilter) <= Number.parseInt(value?.toString()) : true;
          }
          break;
        case 'contains':
          return stringToFilter.includes(value.toString());
        case 'equals':
          switch (filterType) {
            case 'gllTextColumnFilter':
              return stringToFilter.toString() === value.toString();
            case 'gllNumberColumnFilter':
              return value > 0 ? Number.parseInt(stringToFilter) === Number.parseInt(value?.toString()) : true;
          }
          break;
        case 'startsWith':
          return stringToFilter.startsWith(value.toString());
        case 'notEqual':
          return stringToFilter.toString() !== value.toString();
      }
    }
  }

  onSelectPage($event: number) {
    this.clientSideInformation = {
      ...this.clientSideInformation,
      pagination: {
        ...this.clientSideInformation.pagination,
        currentPage: $event,
      }
    };
    const b = this.clientSideInformation.pagination.buckets[this.clientSideInformation.pagination.currentPage];
    this.data = this.clientSideInformation.inputData.slice(b.start, b.stop);

  }

  private buildBuckets(length: number, pageSize: number): Array<{ start: number, stop: number }> {
    const numberOfBuckets = Math.ceil(length / pageSize);
    const toRet = [];
    for (let i = 0; i < numberOfBuckets; i++) {
      toRet.push({start: i * pageSize, stop: (i * pageSize) + pageSize});
    }
    return toRet;
  }


  isObs(label: string | Observable<string>) {
    return Utils.isObs<string>(label);
  }

  deleteBtnDisabled() {
    return this.galileoLanguageService.getLanguage().pipe(
      map(lang => {
        switch (lang) {
          case 'en':
            return this.deleteConfirmInputValue !== 'Delete';
          case 'it':
            return this.deleteConfirmInputValue !== 'Cancella';
        }
      })
    );
  }

  rowClickHandler(r: any) {
    this.rowSelected.emit(r);
    if (this.tableConfig?.navigableRowBehavior !== null) {
      this.tableConfig?.navigableRowBehavior?.enabled.pipe(
        take(1),
      ).subscribe(isNavigable => {
        if (isNavigable === true) {
          const actionEvent = this.tableConfig?.extraActions[this.tableConfig?.navigableRowBehavior?.extraActionIndex ? this.tableConfig.navigableRowBehavior.extraActionIndex : 0];
          if (!!actionEvent && !!actionEvent.disabled && !actionEvent.disabled(r)) {
            this.extraAction.emit({data: r, eventKey: actionEvent.eventKey});
          } else if (!!actionEvent) {
            this.extraAction.emit({data: r, eventKey: actionEvent.eventKey});
          }
        }
      });
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}

export type tableFilterParser = 'spring';

export interface RoWHighLighted {
  backgroundColor: string;
  textColor: string;
  condition: (row) => boolean;
}

export interface TableConfig {
  mode: 'clientSide' | 'serverSide';
  columnsDef: ColumnDef[];
  navigableRowBehavior?: {
    enabled: Observable<boolean>;
    extraActionIndex?: number
  };
  builtInPagination?: boolean;
  isRowSelected?: (row) => boolean;
  isRowHighLighted?: RoWHighLighted;
  cursorPointerOnRow?: boolean;
  tableFilterParser?: tableFilterParser;
  noDataMessage?: string | Observable<string>;
  maxHeight?: string;
  hideActionsMenu?: Observable<boolean>;
  actions?: TableActionDef;
  extraActions?: ExtraAction[]
}

export interface ExtraAction {
  eventKey: string;
  label: string | Observable<string>;
  iconColorProp?: FontAwesomeIconColorBoolPair;
  hide?: boolean | Observable<boolean>;
  disabled?: Function;
}

export interface TableActionDef {
  delete?: { show: boolean | Observable<boolean>, builtIn: boolean, disabled?: Function, showDeleteConfirmInput?: boolean };
}

export interface ColumnDef {
  headerName: string | Observable<string>;
  field: string;
  widthPx?: number;
  sortEnabled?: boolean;
  filterConfig?: ColumnFilterConfig;
  gllTableRenderer?: GllTableRenderer;
  gllTableCustomRender?: Function;
  helpMessage?: GalileoHelpMessage;
  checkboxValue?: Function;
  trueFaIcon?: FontAwesomeIconColorBoolPair;
  falseFaIcon?: FontAwesomeIconColorBoolPair;
}

interface ClientSideInformation {
  inputData: any[];
  pagination: {
    pageSize: number,
    currentPage: number,
    buckets: Array<{ start: number, stop: number }>
  };
}

export type GllTableRenderer = 'gllTableCheckboxRenderer' | 'gllTableDateTimeRenderer' | 'gllTableBooleanRenderer';
