import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { InputComponent } from './input.component';
import {GalileoCommonModule} from '../../utils/galileo-common/galileo-common.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPopoverModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [FormComponent, InputComponent, FileUploadComponent],
    imports: [
        CommonModule,
        GalileoCommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgbPopoverModule,
        NgbTooltipModule
    ],
  exports: [FormComponent, InputComponent, FileUploadComponent]
})
export class GalileoFormsModule { }
