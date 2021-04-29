import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWrapperComponent } from './dialog-wrapper.component';


@NgModule({
  declarations: [DialogWrapperComponent],
  imports: [
    CommonModule
  ],
  exports: [DialogWrapperComponent]
})
export class GalileoDialogWrapperModule { }
