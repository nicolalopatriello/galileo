import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWrapperComponent } from './dialog-wrapper.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [DialogWrapperComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [DialogWrapperComponent]
})
export class GalileoDialogWrapperModule { }
