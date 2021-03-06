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
import {Observable, Subject} from 'rxjs';
import {ColumnFilterConfig, ColumnFilterEvent, columnFilterOptions, columnFilterType} from './components/filters';
import {FontAwesomeIconColorBoolPair, GalileoHelpMessage} from '../../models';
import {TableCellDirective} from './table-cell.directive';
import {FilterParser} from './utils/filter-parser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../utils/utils';
import {GalileoLanguageService} from '../../services';
import {map} from 'rxjs/operators';

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

    public currentRowToDelete: null;
    private currentFilters: Map<string, ColumnFilterEvent> = new Map<string, ColumnFilterEvent>();
    private filtersSubject: Subject<Map<string, ColumnFilterEvent>> = new Subject<Map<string, ColumnFilterEvent>>();

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


    constructor(private dialogService: NgbModal, private galileoLanguageService: GalileoLanguageService) {
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
                    this.tableFilter.emit(parsed);
                    break;
            }
        });
    }


    atLeastOneFilter() {
        return this.tableConfig.columnsDef?.filter(t => !!t.filterConfig).length > 0;
    }

    atLeastOneAction() {
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

    private parseFilter(t: Map<string, ColumnFilterEvent>): any {
        return FilterParser.getHttpParams(this.tableConfig.tableFilterParser, t);
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

    deleteBtmDisabled() {
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
        if (this.tableConfig?.navigableRowBehavior?.enabled) {
            const actionEvent = this.tableConfig?.extraActions[this.tableConfig?.navigableRowBehavior?.extraActionIndex ? this.tableConfig.navigableRowBehavior.extraActionIndex : 0];
            this.extraAction.emit({data: r, eventKey: actionEvent.eventKey});
        }
    }
}

export type tableFilterParser = 'spring';

export interface RoWHighLighted {
    backgroundColor: string;
    textColor: string;
    condition: (row) => boolean;
}

export interface TableConfig {
    navigableRowBehavior?: {
        enabled: boolean;
        extraActionIndex?: number
    };
    mode: 'clientSide' | 'serverSide';
    builtInPagination?: boolean;
    isRowSelected?: (row) => boolean;
    isRowHighLighted?: RoWHighLighted;
    cursorPointerOnRow?: boolean;
    tableFilterParser?: tableFilterParser;
    noDataMessage?: string | Observable<string>;
    maxHeight?: string;
    columnsDef: ColumnDef[];
    actions?: TableActionDef;
    extraActions?: ExtraAction[];
    filtersInputDebounceTime?: number;
}

export interface ExtraAction {
    eventKey: string;
    label: string | Observable<string>;
    iconColorProp: FontAwesomeIconColorBoolPair;
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
