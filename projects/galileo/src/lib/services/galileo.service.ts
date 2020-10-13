import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogType, FontAwesomeIconColorBoolPair} from '../models';
import {from, Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../utils/galileo-common/components/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GalileoService {
  constructor(private modalService: NgbModal) {
  }

  showConfirmDialog = (title: string = 'Dialog title',
                       showCancelButton: boolean = false,
                       confirmButtonLabel: string = 'Ok',
                       body: string,
                       dialogType: DialogType = DialogType.MESSAGE,
                       iconColorPair?: FontAwesomeIconColorBoolPair
  ): Observable<any> => {
    const modalRef = this.modalService.open(ConfirmDialogComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.showCancelButton = showCancelButton;
    modalRef.componentInstance.confirmButtonLabel = confirmButtonLabel;
    modalRef.componentInstance.iconColorPair = iconColorPair;
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.dialogType = dialogType;
    return from(modalRef.result);
  };

}
