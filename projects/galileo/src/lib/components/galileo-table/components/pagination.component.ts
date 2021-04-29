import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gll-pagination',
  template: `
    <div class="w-100 mt-2" *ngIf="numberOfPages > 0">
      <nav>
        <ul class="pagination pagination-sm">
          <li (click)="(currentPage -1 ) >= 0 ? selectPage.emit(currentPage - 1) : null" class="page-item">
            <a class="page-link cursor-pointer">
              <span style="font-size: 13px; vertical-align: middle" class="material-icons-outlined">navigate_before</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link">{{  currentPage + 1 }} {{'pageOf' | galileoTranslate | async }} {{numberOfPages}}</a>
          </li>
          <li (click)="(currentPage + 1) < numberOfPages ? selectPage.emit(currentPage + 1) : null" class="page-item">
            <a class="page-link cursor-pointer">
              <span style="font-size: 13px; vertical-align: middle" class="material-icons-outlined">navigate_next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: []
})
export class PaginationComponent {
  @Input() numberOfPages: number;
  @Input() currentPage: number;
  @Output() selectPage: EventEmitter<number> = new EventEmitter<number>();
}
