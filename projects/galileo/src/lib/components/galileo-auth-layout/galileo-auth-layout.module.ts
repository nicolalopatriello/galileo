import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import {RouterModule} from '@angular/router';
import {GalileoCommonModule} from '../../utils/galileo-common/galileo-common.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    GalileoCommonModule,
  ],
  exports: [AuthLayoutComponent]
})
export class GalileoAuthLayoutModule { }
