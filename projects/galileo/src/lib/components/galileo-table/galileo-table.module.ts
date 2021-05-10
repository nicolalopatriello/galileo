import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FiltersComponent} from './components/filters';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GalileoCommonModule} from '../../utils/galileo-common/galileo-common.module';
import {PaginationComponent, SortFieldComponent} from './components';
import {DatePickerFilterComponent} from './components';
import {FilterIconComponent} from './components/filter-icon.component';
import {ResizableDirective} from './directives/resizable.directive';
import {ResizableComponent} from './components/resizable/resizable.component';


@NgModule({
  declarations: [TableComponent, FiltersComponent, PaginationComponent,
    SortFieldComponent,
    DatePickerFilterComponent, FilterIconComponent, ResizableDirective, ResizableComponent],
  exports: [
    TableComponent,
    PaginationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    GalileoCommonModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ]
})
export class GalileoTableModule { }
