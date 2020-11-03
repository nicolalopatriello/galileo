import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogOptions, DialogType, FontAwesomeIconColorBoolPair} from '../models';
import {from, Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../utils/galileo-common/components/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GalileoService {
  constructor(private modalService: NgbModal) {
  }

  showConfirmDialog = (options: ConfirmDialogOptions): Observable<string> => {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {centered: true, backdrop: 'static', size: 'lg', keyboard: false});
    modalRef.componentInstance.options = options;
    return from(modalRef.result);
  }

}


