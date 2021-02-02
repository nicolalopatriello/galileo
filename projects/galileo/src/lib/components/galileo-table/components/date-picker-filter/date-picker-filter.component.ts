import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDatepicker, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {columnFilterOptions} from '../filters';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'gll-date-picker-filter',
  templateUrl: './date-picker-filter.component.html',
  styles: [
      `
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }

      .custom-day.focused {
        background-color: #e6e6e6;
      }

      .custom-day.range, .custom-day:hover {
        background-color: rgb(2, 117, 216);
        color: white;
      }

      .custom-day.faded {
        background-color: rgba(2, 117, 216, 0.5);
      }

    `
  ]
})
export class DatePickerFilterComponent implements OnDestroy, OnInit, OnChanges {

  @ViewChild(NgbDatepicker) private dp: NgbDatepicker;


  @Input() columnHeaderName: string;
  @Input() availableFilterOptions: columnFilterOptions[];
  @Input() selectedFilterOption: columnFilterOptions;
  @Input() from: number;
  @Input() to: number;

  @Output() dateFilterValue: EventEmitter<{ filterOptions: columnFilterOptions, from: number | null, to: number | null }>
    = new EventEmitter<{ filterOptions: columnFilterOptions; from: number | null; to: number | null }>();


  private fromDate: NgbDate | null;
  private toDate: NgbDate | null = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public columnFilterOptions: columnFilterOptions = 'inRange';
  public dateFilterOptionsFormGroup: FormGroup;
  public hoveredDate: NgbDate | null = null;
  public dpDateModel: NgbDateStruct;

  constructor(public calendar: NgbCalendar) {

    this.dateFilterOptionsFormGroup = new FormGroup({
      option: new FormControl('equals')
    });

    this.dateFilterOptionsFormGroup.controls.option.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter(() => !!this.fromDate)
    ).subscribe(t => {
      this.dateFilterValue.emit({
        filterOptions: t,
        from: !!this.fromDate ? new Date(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day).setHours(0, 0, 0, 0)).getTime() : null,
        to: !!this.toDate ? new Date(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day).setHours(0, 0, 0, 0)).getTime() : null
      });
    });
  }


  onDateSelection(date: NgbDate) {
    switch (this.selectedFilterOption) {
      case 'inRange': {
        if (!this.fromDate && !this.toDate) {
          this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
          this.toDate = date;
        } else {
          this.toDate = null;
          this.fromDate = date;
        }
        break;
      }
      case 'equals': {
        this.fromDate = date;
        this.toDate = this.calendar.getNext(date, 'd', 1);
        break;
      }
      case 'greaterThanOrEqual':
      case 'lessThanOrEqual': {
        this.fromDate = date;
        this.toDate = null;
        break;
      }
    }


    this.dateFilterValue.emit({
      filterOptions: this.dateFilterOptionsFormGroup.controls.option.value,
      from: !!this.fromDate ? new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day).getTime() : null,
      to: !!this.toDate ? new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day).getTime() : null
    });

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  ngOnInit(): void {
    if (!!this.selectedFilterOption && this.selectedFilterOption) {
      this.dateFilterOptionsFormGroup.controls.option.setValue(this.selectedFilterOption);
    } else {
      this.dateFilterOptionsFormGroup.controls.option.setValue(this.availableFilterOptions[0]);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.from && changes.from.currentValue) {
      setTimeout(() => {
        const from = new Date(changes.from.currentValue);
        this.fromDate = new NgbDate(from.getFullYear(), from.getMonth() + 1, from.getDate());
        this.dpDateModel = {day: this.fromDate.day, month: this.fromDate.month, year: this.fromDate.year};
        this.dp.navigateTo({day: this.fromDate.day, month: this.fromDate.month, year: this.fromDate.year});
      }, 1);
    }

    if (!!changes.to && changes.to.currentValue) {
      setTimeout(() => {
        const to = new Date(changes.to.currentValue);
        this.toDate = new NgbDate(to.getFullYear(), to.getMonth() + 1, to.getDate());
        this.dp.navigateTo({day: this.fromDate.day, month: this.fromDate.month, year: this.fromDate.year});
        //   this.dpDateModel = {day: this.fromDate.day, month: this.fromDate.month, year: this.fromDate.year};
      }, 1);
    }

    /*    if (changes.to.currentValue) {
          console.log('to', changes.to.currentValue);
          const to = new Date(changes.to.currentValue);
          this.toDate = new NgbDate(to.getFullYear(), to.getMonth(), to.getDay() - 1);
          console.log(this.toDate);
        }*/
  }

}
