import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Subject} from 'rxjs';
import {ColumnFilterConfig, ColumnFilterEvent, columnFilterOptions} from './components/filters';
import {FontAwesomeIconColorBoolPair} from '../../models/font-awesome-icon-color-bool-pair';
import {TableCellDirective} from './table-cell.directive';
import {FilterParser} from './utils/filter-parser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gll-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('deleteRowDialog', {static: true}) deleteRowDialog: TemplateRef<any>;
  @ContentChild(TableCellDirective, {read: TemplateRef}) tableCellTemplate;


  @Input() tableConfig: TableConfig;
  @Input() data: any[] = [];

  @Output() deleteConfirm: EventEmitter<any> = new EventEmitter();
  @Output() tableFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() extraAction: EventEmitter<{ eventKey: string, data: any }> = new EventEmitter<{ eventKey: string, data: any }>();
  @Output() checkboxRendererEvent: EventEmitter<{ checked: boolean, data: any, field: string }> = new EventEmitter<{ checked: boolean, data: any, field: string }>();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

  private currentRowToDelete: null;
  private currentFilters: Map<string, ColumnFilterEvent> = new Map<string, ColumnFilterEvent>();
  private filtersSubject: Subject<Map<string, ColumnFilterEvent>> = new Subject<Map<string, ColumnFilterEvent>>();

  public clientSideInformation: ClientSideInformation = {
    inputData: [],
    pagination: {
      pageSize: 5, //default page size
      currentPage: 0,
      buckets: []
    }
  };


  constructor(private dialogService: NgbModal) {
  }

  trackByFn(index: any, item: any) {
    return index;
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
    if (this.tableConfig.mode === 'clientSide') {
      this.clientSideInformation = {
        ...this.clientSideInformation,
        inputData: this.data,
        pagination: {
          ...this.clientSideInformation.pagination,
          buckets: this.buildBuckets(this.data?.length, this.clientSideInformation.pagination.pageSize)
        }
      };
      const b = this.clientSideInformation.pagination.buckets[0]
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
          this.tableFilter.emit(parsed);
          break;
      }
    });
  }


  atLeastOneFilter() {
    return this.tableConfig.columnsDef?.filter(t => !!t.filterConfig).length > 0;
  }

  atLeastOneAction() {
    return this.tableConfig?.actions?.edit?.show || this.tableConfig?.actions?.delete?.show || this.tableConfig?.extraActions?.length > 0;
  }

  onDelete(r: any) {
    if (this.tableConfig.actions.delete.builtIn) {
      this.currentRowToDelete = r;
      this.dialogService.open(this.deleteRowDialog, {size: 'md', backdrop: 'static', centered: true});
    }
  }

  confirmDelete() {
    this.deleteConfirm.emit(this.currentRowToDelete);
    this.dialogService.dismissAll();
  }

  cancelDelete() {
    this.currentRowToDelete = null;
    this.dialogService.dismissAll();
  }

  onEdit() {
    if (this.tableConfig.actions.edit.builtIn && !this.tableConfig.actions.edit.disabled()) {
      console.log('Implement edit...');
    }
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

  private parseFilter(t: Map<string, ColumnFilterEvent>): any {
    return FilterParser.getHttpParams(this.tableConfig.tableFilterParser, t);
  }

  private handleClientSideFilter(filters: Map<string, ColumnFilterEvent>) {
    let filteredData = this.clientSideInformation?.inputData;
    const keys = Array.from(filters.keys());
    keys.forEach(t => {
      filteredData = filteredData?.filter(dataRow => this.applyOperator(dataRow[t], filters.get(t).type, filters.get(t).value));
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
    }

  }

  private applyOperator(stringToFilter: string, filterOption: columnFilterOptions, value: string | number) {
    if (stringToFilter?.length) {
      switch (filterOption) {
        case 'contains':
          return stringToFilter.includes(value.toString());
        case 'equals':
          return stringToFilter.toString() === value.toString();
        case 'startsWith':
          return stringToFilter.startsWith(value.toString());
        case 'notEqual':
          return stringToFilter.toString() != value.toString();
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
    }
    const b = this.clientSideInformation.pagination.buckets[this.clientSideInformation.pagination.currentPage]
    this.data = this.clientSideInformation.inputData.slice(b.start, b.stop)

  }

  private buildBuckets(length: number, pageSize: number): Array<{ start: number, stop: number }> {
    let numberOfBuckets = Math.ceil(length / pageSize);
    const toRet = [];
    for (let i = 0; i < numberOfBuckets; i++) {
      toRet.push({start: i * pageSize, stop: (i * pageSize) + pageSize});
    }
    return toRet;
  }
}

export type tableFilterParser = 'spring'

export interface TableConfig {
  mode: 'clientSide' | 'serverSide'
  builtInPagination?: boolean;
  isRowSelected?: Function;
  cursorPointerOnRow?: boolean;
  tableFilterParser?: tableFilterParser;
  noDataMessage?: string;
  maxHeight?: string
  columnsDef: ColumnDef[];
  actions?: TableActionDef;
  extraActions?: ExtraAction[];
  filtersInputDebounceTime?: number;
}

export interface ExtraAction {
  eventKey: string;
  label: string;
  iconColorProp: FontAwesomeIconColorBoolPair,
  disabled?: Function
}

export interface TableActionDef {
  delete?: { show: boolean, builtIn: boolean, disabled?: Function, customMessage?: string }
  add?: { show: boolean, builtIn: boolean, disabled?: Function };
  edit?: { show: boolean, builtIn: boolean, disabled?: Function };
}

export interface ColumnDef {
  headerName: string;
  field: string;
  sortEnabled?: boolean;
  filterConfig?: ColumnFilterConfig;
  gllTableRenderer?: GllTableRenderer;
  gllTableCustomRender?: Function;
  checkboxValue?: Function;
  trueFaIcon?: FontAwesomeIconColorBoolPair,
  falseFaIcon?: FontAwesomeIconColorBoolPair
}

interface ClientSideInformation {
  inputData: any[],
  pagination: {
    pageSize: number,
    currentPage: number,
    buckets: Array<{ start: number, stop: number }>
  }
}

export type GllTableRenderer = 'gllTableCheckboxRenderer' | 'gllTableDateTimeRenderer' | 'gllTableBooleanRenderer'
