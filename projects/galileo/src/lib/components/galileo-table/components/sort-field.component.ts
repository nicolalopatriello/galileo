import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnSortEvent, sortType} from './models';

@Component({
  selector: 'gll-sort-field',
  template: `
    <em (click)="sort()" style="font-size: 16px; vertical-align: text-bottom;
            float: right; margin-top: 10px" class="material-icons-outlined cursor-pointer user-select-none">{{icons[currentValueIdx]}}</em>
  `,
})
export class SortFieldComponent implements OnInit {

  @Input() field: string;
  @Input() default: sortType;
  @Output() sortBy: EventEmitter<ColumnSortEvent> = new EventEmitter<ColumnSortEvent>();

  private values = [null, 'asc', 'desc'];
  public icons = ['unfold_more', 'arrow_upward', 'arrow_downward'];
  public currentValueIdx = 0;

  ngOnInit(): void {
    this.currentValueIdx = this.default == null ? 0 : this.getDefaultIndex(this.default);
  }

  private getDefaultIndex(def: sortType) {
    switch (def) {
      case 'asc':
        return 1;
      case 'desc':
        return 2;
    }
  }

  sort() {
    this.currentValueIdx = (this.currentValueIdx + 1) % 3;
    const payload = {value: this.values[this.currentValueIdx] as any, columnField: this.field};
    this.sortBy.emit(payload);
  }
}
