import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gll-pagination',
  template: `
    <div class="w-100 mt-2" *ngIf="numberOfPages > 0">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li (click)="(currentPage -1 ) >= 0 ? selectPage.emit(currentPage - 1) : null" class="page-item">
            <a class="page-link cursor-pointer"><</a>
          </li>
          <li class="page-item">
            <a class="page-link">{{'pageOf' | galileoTranslate: { currentPage: currentPage + 1, totalPages: numberOfPages } }}
            </a>
          </li>
          <li (click)="(currentPage + 1) < numberOfPages ? selectPage.emit(currentPage + 1) : null" class="page-item">
            <a class="page-link cursor-pointer">></a>
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

  constructor() {
  }


}
