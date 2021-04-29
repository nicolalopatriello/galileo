import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWrapperComponent } from './dialog-wrapper.component';
import {GalileoCommonModule} from '../../utils/galileo-common/galileo-common.module';


@NgModule({
  declarations: [DialogWrapperComponent],
    imports: [
        CommonModule,
        GalileoCommonModule
    ],
  exports: [DialogWrapperComponent]
})
export class GalileoDialogWrapperModule { }
