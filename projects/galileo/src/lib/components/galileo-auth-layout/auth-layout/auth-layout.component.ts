import { Component, Input } from '@angular/core';
import { CarouselItem } from '../../../models';

@Component({
  selector: 'gll-auth-layout',
  styleUrls: ['./auth-layout.component.scss'],
  template: `
      <div [ngClass]="{'gll-auth-layout-grid-container--carousel': carouselConfig,
      'gll-auth-layout-grid-container--only-form': carouselConfig === null}"
           class="w-100 h-100">
          <div class="carousel-content" *ngIf="carouselConfig">
              <gll-carousel [items]="carouselConfig?.items"></gll-carousel>
          </div>
          <div class="form-content">
              <router-outlet></router-outlet>
          </div>
      </div>

  `
})
export class AuthLayoutComponent {
  @Input() carouselConfig: CarouselConfig = null;
}

export interface CarouselConfig {
  items: CarouselItem[];
}
