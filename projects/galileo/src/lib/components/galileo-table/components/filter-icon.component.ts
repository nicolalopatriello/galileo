import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gll-filter-icon',
  template: `
    <div>
      <svg [attr.height.px]="size"
           [attr.width]="size" viewBox="-4 0 393 393.99" xmlns="http://www.w3.org/2000/svg"><path d="M368.313 0H17.05A16.5 16.5 0 002.344 8.96a16.732 16.732 0 001.3 17.415l128.688 181.281c.043.063.09.121.133.184a36.769 36.769 0 017.219 21.816v147.797a16.429 16.429 0 0016.433 16.535c2.227 0 4.426-.445 6.48-1.297l72.313-27.574c6.48-1.976 10.781-8.09 10.781-15.453V229.656a36.774 36.774 0 017.215-21.816c.043-.063.09-.121.133-.184L381.723 26.367a16.717 16.717 0 001.3-17.406A16.502 16.502 0 00368.313 0zM236.78 195.992a56.931 56.931 0 00-11.097 33.664v117.578l-66 25.164V229.656a56.909 56.909 0 00-11.102-33.664L23.648 20h338.07zm0 0"/></svg>
    </div>
  `,
})
export class FilterIconComponent {
  @Input() size: number;
}
