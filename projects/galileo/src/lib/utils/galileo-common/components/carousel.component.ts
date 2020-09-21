import { Component, Input } from '@angular/core';
import {CarouselItem} from '../../../models';

@Component({
  selector: 'gll-carousel',
  template: `
      <ngb-carousel class="gll-carousel" data-ride="carousel" *ngIf="items?.length > 0" [showNavigationArrows]="false"
                    [showNavigationIndicators]="false">
          <ng-template *ngFor="let item of items" ngbSlide>
              <div class="picsum-img-wrapper">
                  <img [src]="item.image" class="full-width">
              </div>
              <div class="carousel-caption" *ngIf="item.title || item.subtitle">
                  <h3 *ngIf="item.title">{{item.title}}</h3>
                  <p *ngIf="item.subtitle">{{item.subtitle}}</p>
              </div>
          </ng-template>
      </ngb-carousel>
  `,
  styles: [`
      .gll-carousel img {
          width: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 100vh;
      }
  `]
})
export class CarouselComponent {
  @Input() items: CarouselItem[];
}
