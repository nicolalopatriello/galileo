import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {RouterModule} from '@angular/router';
import {GalileoTableModule} from '../../../../../galileo/src/lib/components/galileo-table/galileo-table.module';
import {MarkdownModule} from 'ngx-markdown';


@NgModule({
  declarations: [TableComponent],
  imports: [
    GalileoTableModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild([{
      path: '', component: TableComponent
    }])
  ]
})
export class TablesModule { }
