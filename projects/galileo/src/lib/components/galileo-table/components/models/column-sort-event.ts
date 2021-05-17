export interface ColumnSortEvent {
  columnField: string;
  value: sortType;
}

export type sortType = 'asc' | 'desc';
