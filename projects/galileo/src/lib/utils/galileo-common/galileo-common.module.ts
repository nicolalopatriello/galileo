import { CommonModule } from '@angular/common';
import {GalileoTranslatePipe} from './pipes/galileo-translate/galileo-translate.pipe';
import {ConfirmDialogComponent} from './components/confirm-dialog.component';
import {CarouselComponent} from './components/carousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [GalileoTranslatePipe, ConfirmDialogComponent, CarouselComponent],
  imports: [
    NgbModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [GalileoTranslatePipe, ConfirmDialogComponent, CarouselComponent]
})
export class GalileoCommonModule { }
