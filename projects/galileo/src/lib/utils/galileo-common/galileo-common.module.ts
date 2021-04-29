import {CommonModule} from '@angular/common';
import {GalileoTranslatePipe} from './pipes/galileo-translate/galileo-translate.pipe';
import {ConfirmDialogComponent} from './components/confirm-dialog.component';
import {CarouselComponent} from './components/carousel.component';
import {NgbModule, NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PopoverLayerComponent, PopoverWrapperComponent} from './components/popover-wrapper.component';
import {GalileoDatePipe} from './pipes/galileo-date.pipe';


@NgModule({
  declarations: [GalileoTranslatePipe, GalileoDatePipe, ConfirmDialogComponent, CarouselComponent, PopoverWrapperComponent, PopoverLayerComponent],
  entryComponents: [PopoverWrapperComponent, PopoverLayerComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    NgbPopoverModule,
    NgbTooltipModule
  ],
  exports: [GalileoTranslatePipe, GalileoDatePipe, ConfirmDialogComponent, CarouselComponent, PopoverWrapperComponent]
})
export class GalileoCommonModule {
}
