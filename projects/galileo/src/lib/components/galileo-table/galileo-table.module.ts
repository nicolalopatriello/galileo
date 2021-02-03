import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FiltersComponent} from './components/filters';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GalileoCommonModule} from '../../utils/galileo-common/galileo-common.module';
import {PaginationComponent} from './components';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DatePickerFilterComponent} from './components/date-picker-filter';


@NgModule({
  declarations: [TableComponent, FiltersComponent, PaginationComponent, DatePickerFilterComponent],
  exports: [
    TableComponent,
    PaginationComponent
  ],
  imports: [
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    NgbModule,
    GalileoCommonModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ]
})
export class GalileoTableModule { }
